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
        this.state.entries = [];
        clear();
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
            this.state.entries = loaded;
        }
    }

    addTimeStamp() {
        var entries;

        let timeStamp = this.createTimeStamp();

        entries = this.state.entries;

        if (this.isEmpty()) {
            // add new item with timestamp as start
            this.state.entries.push({
                id: this.state.entries.length,
                start: timeStamp
            });
        } else {
            if (entries[entries.length - 1].end === undefined) {
                // set timestamp as end time
                entries[entries.length - 1].end = timeStamp;
            } else {
                // add new item with timestamp as start
                this.state.entries.push({
                    id: this.state.entries.length,
                    start: timeStamp
                });
            }
        }
    }

    createTimeStamp() {
        var result, timestamp;
        timestamp = new Date();
        result = {};

        result.value = timestamp.getTime();
        result.string = timestamp;
        return result;
    }

    isEmpty() {
        if (this.state.entries === undefined) return true;
        if (this.state.entries === null) return true;
        if (this.state.entries.length === 0) return true;
        return false;
    }
}
