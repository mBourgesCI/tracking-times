/* eslint-disable no-unused-vars */
import { LightningElement, track } from 'lwc';
import { save, load, clear } from 'data/localStorage';

export default class TimeTracking extends LightningElement {
    @track state = {};

    connectedCallback() {
        this.state.entries = [];
        this.loadData();
    }

    handleClickAdd() {
        this.addTimeStamp();
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
        //this.state.entries = [];
        //clear();
    }

    saveData() {
        let entries = this.state.entries;
        save(entries);
    }

    loadData() {
        let loaded = load();
        if (loaded === undefined || loaded === null) {
            this.state.entries = [];
        } else {
            loaded.forEach(loadedEntry => {
                let recordCount = this.state.entries.length;
                let tempEntry = {};
                loadedEntry.id = recordCount;

                tempEntry.index = recordCount;
                tempEntry.data = JSON.stringify(loadedEntry);

                this.state.entries.push(tempEntry);
            });
        }
    }

    handleChangeEntry(event) {
        this.processEntryChange(event.detail);
    }

    processEntryChange(newDetail) {
        var entryId, parameterName, parameterValue, entryString, entry;
        entryId = parseInt(newDetail.entryId, 10);
        parameterName = newDetail.name;
        parameterValue = newDetail.value;

        if (
            entryId !== undefined &&
            parameterName !== undefined &&
            parameterValue !== undefined
        ) {
            entryString = this.state.entries[entryId].data;
            entry = JSON.parse(entryString);

            if (parameterName === 'comment') {
                entry.comment = parameterValue;
            }
            if (parameterName === 'start') {
                entry.start.value = parameterValue;
            }
            if (parameterName === 'end') {
                entry.end.value = parameterValue;
            }
            this.state.entries[entryId].data = JSON.stringify(entry);
        }
    }

    createTimeStamp() {
        var result, timestamp;
        timestamp = new Date();
        result = {};

        result.value = timestamp.getTime();
        result.string = {};
        result.string.date = timestamp.toISOString().split('T')[0];
        result.string.time = timestamp.toLocaleTimeString().substr(0, 5);
        return result;
    }

    isEmpty() {
        if (this.state.entries === undefined) return true;
        if (this.state.entries === null) return true;
        if (this.state.entries.length === 0) return true;
        return false;
    }
}
