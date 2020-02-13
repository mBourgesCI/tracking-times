import { LightningElement, track } from 'lwc';
import { startDownload } from 'data/fileDownload';
import { save, load, clear } from 'data/localStorage';

const MILISECONDS_PER_MINUTE = 1000 * 60;
const MILISECONDS_PER_FIFTEEN_MINUTE = MILISECONDS_PER_MINUTE * 15;
const MILISECONDS_PER_HOUR = MILISECONDS_PER_MINUTE * 60;
const CUTTING_TYPE_CEIL = 'ceil';
const CUTTING_TYPE_FLOOR = 'floor';
const CUTTING_TYPE_ROUND = 'round';

export default class TimeTracking extends LightningElement {
    @track state = {
        label: {
            button: {
                save: 'Save',
                load: 'Load',
                clear: 'Clear',
                add: 'Add'
            },
            modal: {
                clear: {
                    title: 'Clear',
                    body: 'Clear all entries?'
                }
            }
        }
    };

    connectedCallback() {
        this.state.entries = [];
        this.loadData();
    }

    handleClickAdd() {
        this.processClickAdd();
        this.saveData();
    }

    handleClickClear() {
        this.showClearModal();
    }

    handleClickClearCancel() {
        this.hideClearModal();
    }

    handleClickClearConfirm() {
        this.hideClearModal();
        this.processClearData();
    }

    handleEventDelete(event) {
        const itemSortNumber = event.target.getAttribute('data-index');

        this.processEntryDelete(itemSortNumber);
        this.saveData();
    }

    handleClickExport() {
        this.proccessExport();
    }

    //----------------------------
    // Actions
    //----------------------------

    proccessExport() {
        this.doExportCsv();
    }

    doExportCsv() {
        const output = [];
        const firstLine =
            ' Startdate | Starttime |    Enddate | Endtime | Duration (h) | Comment\n';
        output.push(firstLine);
        const secondLine =
            '===================================================================================\n';
        output.push(secondLine);

        const columnSeparator = ' | ';
        this.state.entries.forEach(entry => {
            let outputLine = '';

            // add start date column
            let startDateStr = extractDateStringFromTimeStamp(entry.start);
            outputLine += startDateStr;
            outputLine += columnSeparator;

            //add start time column
            let startTimeStr = extractTimeStringFromTimeStamp(entry.start);
            outputLine += '    ';
            outputLine += startTimeStr;
            outputLine += columnSeparator;

            // add end date column
            let endDateStr = extractDateStringFromTimeStamp(entry.end);
            outputLine += endDateStr;
            outputLine += columnSeparator;

            //add start time column
            let endTimeStr = extractTimeStringFromTimeStamp(entry.end);
            outputLine += '  ';
            outputLine += endTimeStr;
            outputLine += columnSeparator;

            // add difference column
            let differenceStr = '' + getdifference(entry.start, entry.end);
            let columnWidth = 13;
            //leading spaces
            outputLine += ' '.repeat(columnWidth - differenceStr.length - 1);

            outputLine += differenceStr;
            outputLine += columnSeparator;

            // add comment
            let commentStr = entry.comment;
            commentStr = commentStr ? commentStr : '';
            outputLine += commentStr;

            // add line break
            outputLine += '\n';
            output.push(outputLine);
        });
        startDownload('export.txt', output, 'test/plain');
    }

    processEntryDelete(itemSortNumber) {
        let index, entryIndex, newlength;

        index = parseInt(itemSortNumber, 10);
        entryIndex = this.state.entries.findIndex(entry => {
            return entry.sortnumber === index;
        });

        // delete entry
        this.state.entries.splice(entryIndex, 1);

        // rewrite sort numbers
        newlength = this.state.entries.length;

        for (let i = 0; i < this.state.entries.length; i++) {
            const element = this.state.entries[i];
            element.sortnumber = newlength - i;
        }
    }

    saveData() {
        const data = {
            settings: {
                version: 'v0.4'
            },
            entries: this.state.entries
        };

        save(data);
    }

    loadData() {
        let loaded = load();
        if (loaded === undefined || loaded === null) {
            this.state.entries = [];
        } else {
            if (loaded.settings === undefined) {
                this.loadLegacyData(loaded);
            }
            if (loaded.settings !== undefined) {
                if (loaded.settings.version === 'v0.3') {
                    this.loadDataV03(loaded);
                }
                if (loaded.settings.version === 'v0.4') {
                    this.loadDataV04(loaded);
                }
            }
        }
    }

    loadLegacyData(loaded) {
        this.state.entries = [];
        if (loaded.length !== undefined) {
            loaded.forEach(loadedEntry => {
                let entryData = JSON.parse(loadedEntry.data);
                let tempEntry = {
                    sortnumber: this.state.entries.length,
                    itemId: entryData.start.value + this.state.entries.length,
                    start: entryData.start.value,
                    end: entryData.end.value,
                    comment: entryData.comment
                };
                this.state.entries.push(tempEntry);
            });
        }
    }

    loadDataV03(loaded) {
        const { settings, entries } = loaded;
        this.state.version = settings.version;
        this.state.entries = entries
          .map((entry, index) => {
            entry.itemId = entry.start + index;

            return entry;
          });
    }

    loadDataV04(loaded) {
        this.state.version = loaded.settings.version;
        this.state.entries = loaded.entries;
    }

    handleChangeEntry(event) {
        let index = event.srcElement.getAttribute('data-index');
        this.processEntryChange(index, event.detail);
        this.saveData();
    }

    fireClearDataConfirmation() {
        // eslint-disable-next-line no-alert
        const confirmationResult = confirm('Clear all entries?');
        return confirmationResult;
    }

    processClearData() {
        this.state.entries = [];
        clear();
    }

    processClickAdd() {
        const entryConfig = {
            cuttingType: CUTTING_TYPE_ROUND,
            cuttingAccuracy: MILISECONDS_PER_FIFTEEN_MINUTE,
            defaultDuration: MILISECONDS_PER_HOUR
        };
        const newEntry = this.createListEntry(entryConfig);
        this.state.entries.unshift(newEntry);
    }

    processEntryChange(index, newDetail) {
        let entry;
        const startValue = newDetail.start;
        const endValue = newDetail.end;
        const commentValue = newDetail.comment;

        if (index !== undefined) {
            let entryIndex = parseInt(index, 10);

            entry = this.state.entries.find(function(tempEntry) {
                return tempEntry.sortnumber === entryIndex;
            });

            if (entry !== undefined) {
                if (startValue !== undefined) {
                    entry.start = startValue;
                }
                if (endValue !== undefined) {
                    entry.end = endValue;
                }
                if (commentValue !== undefined) {
                    entry.comment = commentValue;
                }
            }
        }
    }

    createListEntry(entryConfig) {
        let newEntry = {};
        let newEntryId = this.state.entries.length;
        const currentTime = new Date().getTime();
        const approximatedTime = this.createNewTimestamp(entryConfig);

        newEntryId = newEntryId === undefined ? 0 : newEntryId;
        // tests add all entries in the very same millisecond which causes key-values to not unique
        // => to tackle the we add as many milliseconds as there are entries in the entry list
        newEntry.itemId = currentTime + this.state.entries.length;
        newEntry.sortnumber = newEntryId;
        newEntry.start = approximatedTime;
        newEntry.end = approximatedTime + MILISECONDS_PER_HOUR;
        newEntry.comment = '';

        return newEntry;
    }

    createNewTimestamp(entryConfig) {
        let currentTime, method;

        //set default values for cutting typ and accuracy
        let cuttingType = CUTTING_TYPE_ROUND;
        let cuttingAccuracy = MILISECONDS_PER_FIFTEEN_MINUTE;

        if (entryConfig !== undefined) {
            // set cutting type
            cuttingType =
                entryConfig.cuttingType !== undefined
                    ? entryConfig.cuttingType
                    : CUTTING_TYPE_ROUND;

            // set cutting accuracy
            cuttingAccuracy =
                entryConfig.cuttingAccuracy !== undefined
                    ? entryConfig.cuttingAccuracy
                    : MILISECONDS_PER_FIFTEEN_MINUTE;
        }

        // Select algorithm by cutting type
        if (cuttingType === CUTTING_TYPE_ROUND) {
            method = Math.round;
        }
        if (cuttingType === CUTTING_TYPE_CEIL) {
            method = Math.ceil;
        }
        if (cuttingType === CUTTING_TYPE_FLOOR) {
            method = Math.floor;
        }

        // do calculations
        currentTime = new Date().getTime();
        currentTime = method(currentTime / cuttingAccuracy) * cuttingAccuracy;

        return currentTime;
    }

    get isEmpty() {
        if (this.state.entries === undefined) return true;
        if (this.state.entries === null) return true;
        if (this.state.entries.length === 0) return true;
        return false;
    }

    showClearModal() {
        this.getClearModal().show();
    }

    hideClearModal() {
        this.getClearModal().hide();
    }

    //----------------------
    // Element selectors
    //----------------------

    getClearModal() {
        return this.template.querySelector('.modal-clear');
    }
}

//----------------------------
// Date/Time Utils (should be exported as being used in entrycmp too)
//----------------------------

function extractTimeStringFromTimeStamp(timestamp) {
    let fullDate, timeString;

    fullDate = new Date(timestamp);
    timeString = fullDate.toLocaleTimeString().substr(0, 5);

    return timeString;
}

function extractDateStringFromTimeStamp(timestamp) {
    let fullDate, dateString;
    fullDate = new Date(timestamp);
    dateString = fullDate.toISOString().split('T')[0];
    return dateString;
}

function getdifference(startTimeStamp, endTimeStamp) {
    let difference = endTimeStamp - startTimeStamp;
    return difference / (1000 * 60 * 60);
}
