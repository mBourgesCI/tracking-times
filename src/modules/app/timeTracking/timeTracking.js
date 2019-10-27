import { LightningElement, track } from 'lwc';
import { save, load, clear } from 'data/localStorage';

export default class TimeTracking extends LightningElement {
    @track state = {};

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
        this.state.entries = [];
        clear();
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

    processClickAdd() {
        var newEntry;
        newEntry = this.createListEntry();
        this.state.entries.push(newEntry);
    }

    processEntryChange(index, newDetail) {
        var parameterName, parameterValue, entry;

        parameterName = newDetail.name;
        parameterValue = newDetail.value;

        if (
            index !== undefined &&
            parameterName !== undefined &&
            parameterValue !== undefined
        ) {
            entry = this.state.entries[parseInt(index, 10)];
            if (parameterName === 'comment') {
                entry.comment = parameterValue;
            }
            if (parameterName === 'start') {
                entry.start = parameterValue;
            }
            if (parameterName === 'end') {
                entry.end = parameterValue;
            }
        }
    }

    createListEntry() {
        var newEntry, currentTime, newEntryId;

        newEntryId = this.state.entries.length;
        newEntryId = newEntryId === undefined ? 0 : newEntryId;
        currentTime = new Date().getTime();

        newEntry = {};
        newEntry.sortnumber = newEntryId;
        newEntry.start = currentTime;
        newEntry.end = currentTime + 1000 * 60 * 60;
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
