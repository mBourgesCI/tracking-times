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

    handleChangeEndtime(event) {
        var param = {};

        param.entry = event.target.getAttribute('data-entry');
        param.input = 'end';
        param.type = 'time';
        param.value = event.target.value;

        this.changeTime(param);
    }

    handleChangeStarttime(event) {
        var param = {};

        param.entry = event.target.getAttribute('data-entry');
        param.input = 'start';
        param.type = 'time';
        param.value = event.target.value;

        this.changeTime(param);
    }

    handleChangeStartDate(event) {
        var param = {};

        param.entry = event.target.getAttribute('data-entry');
        param.input = 'start';
        param.type = 'date';
        param.value = event.target.value;

        this.changeTime(param);
    }

    handleChangeEndDate(event) {
        var param = {};

        param.entry = event.target.getAttribute('data-entry');
        param.input = 'end';
        param.type = 'date';
        param.value = event.target.value;

        this.changeTime(param);
    }

    changeTime(param) {
        var index, entry;

        index = parseInt(param.entry, 10);

        if (param.input === 'end') {
            entry = this.state.entries[index].end;
        }
        if (param.input === 'start') {
            entry = this.state.entries[index].start;
        }

        if (entry !== undefined) {
            if (param.type === 'time') {
                entry.string.time = param.value;
            }
            if (param.type === 'date') {
                entry.string.date = param.value;
            }
        }
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
                start: timeStamp,
                diff: null
            });
        } else {
            if (entries[entries.length - 1].end === undefined) {
                // set timestamp as end time
                entries[entries.length - 1].end = timeStamp;
            } else {
                // add new item with timestamp as start
                this.state.entries.push({
                    id: this.state.entries.length,
                    start: timeStamp,
                    diff: null
                });
            }
        }
    }

    calculateDiffs(){
        this.state.entries.forEach(entry => {
            if(entry.start && entry.end) {
                let diff = entry.end.value - entry.start.value;
                entry.diff = diff;
            }
        });
    }

    createTimeStamp() {
        var result, timestamp;
        timestamp = new Date();
        result = {};

        result.value = timestamp.getTime();
        result.string = {};
        result.string.date = timestamp.toISOString().split('T')[0];
        result.string.time = timestamp.toLocaleTimeString();
        return result;
    }

    isEmpty() {
        if (this.state.entries === undefined) return true;
        if (this.state.entries === null) return true;
        if (this.state.entries.length === 0) return true;
        return false;
    }
}
