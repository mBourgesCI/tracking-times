import { LightningElement, track } from 'lwc';
import { save, load, clear } from 'data/localStorage';

const MILISECONDS_PER_MINUTE = 1000 * 60;
const MILISECONDS_PER_FIFTEEN_MINUTE = MILISECONDS_PER_MINUTE * 15;
const MILISECONDS_PER_HOUR = MILISECONDS_PER_MINUTE * 60;
const CUTTING_TYPE_ROUND = 'round';

export default class TimeTracking extends LightningElement {
    @track state = {
        label: {
            button: {
                save: 'Save',
                load: 'Load',
                clear: 'Clear',
                add: 'Add'
            }
        }
    };

    connectedCallback() {
        this.state.entries = [];
        this.loadData();
    }

    handleClickAdd() {
        this.processClickAdd();
    }

    handleClickSave() {
        this.saveData();
    }

    handleClickLoad() {
        this.loadData();
    }

    handleClickClear() {
        this.clearData();
    }

    clearData() {
        // eslint-disable-next-line no-unused-vars
        var clearConfirmation = this.fireClearDataConfirmation();
        if (clearConfirmation) {
            this.processClearData();
        }
    }

    saveData() {
        var data = {
            settings: {
                version: 'v0.3'
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
            }
        }
    }

    loadLegacyData(loaded) {
        this.state.entries = [];
        loaded.forEach(loadedEntry => {
            let entryData = JSON.parse(loadedEntry.data);
            let tempEntry = {
                sortnumber: this.state.entries.length,
                start: entryData.start.value,
                end: entryData.end.value,
                comment: entryData.comment
            };
            this.state.entries.push(tempEntry);
        });
    }

    loadDataV03(loaded) {
        this.state.version = loaded.settings.version;
        this.state.entries = loaded.entries;
    }

    handleChangeEntry(event) {
        let index = event.srcElement.getAttribute('data-index');
        this.processEntryChange(index, event.detail);
    }

    fireClearDataConfirmation() {
        // eslint-disable-next-line no-alert
        var confirmationResult = confirm('Clear all entries?');
        return confirmationResult;
    }

    processClearData() {
        this.state.entries = [];
        clear();
    }

    processClickAdd() {
        var newEntry, entryConfig;
        entryConfig = {
            cuttingType: CUTTING_TYPE_ROUND,
            cuttingAccuracy: MILISECONDS_PER_FIFTEEN_MINUTE,
            defaultDuration: MILISECONDS_PER_HOUR
        };
        newEntry = this.createListEntry(entryConfig);
        this.state.entries.unshift(newEntry);
    }

    processEntryChange(index, newDetail) {
        var entry, startValue, endValue, commentValue;

        startValue = newDetail.start;
        endValue = newDetail.end;
        commentValue = newDetail.comment;

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

    createListEntry() {
        var newEntry, currentTime, newEntryId;

        newEntryId = this.state.entries.length;
        newEntryId = newEntryId === undefined ? 0 : newEntryId;
        currentTime = new Date().getTime();
        currentTime =
            Math.round(currentTime / MILISECONDS_PER_FIFTEEN_MINUTE) *
            MILISECONDS_PER_FIFTEEN_MINUTE;

        newEntry = {};
        newEntry.sortnumber = newEntryId;
        newEntry.start = currentTime;
        newEntry.end = currentTime + MILISECONDS_PER_HOUR;
        newEntry.comment = '';

        return newEntry;
    }

    isEmpty() {
        if (this.state.entries === undefined) return true;
        if (this.state.entries === null) return true;
        if (this.state.entries.length === 0) return true;
        return false;
    }
}
