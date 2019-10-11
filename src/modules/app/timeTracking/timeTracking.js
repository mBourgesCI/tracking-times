/* eslint-disable no-unused-vars */
import { LightningElement, track } from 'lwc';
import { save, load, clear } from 'data/localStorage';

export default class TimeTracking extends LightningElement {
    @track state = {};

    connectedCallback() {
        this.state.entries = [];
        this.loadData();
        this.calculateDiffs();
    }

    handleClickAdd() {
        this.addTimeStamp();
        this.calculateDiffs();
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

        param.entryIndex = event.target.getAttribute('data-entry');
        param.input = 'end';
        param.type = 'time';
        param.value = event.target.value;

        this.changeTime(param);
    }

    handleChangeStarttime(event) {
        var param = {};

        param.entryIndex = event.target.getAttribute('data-entry');
        param.input = 'start';
        param.type = 'time';
        param.value = event.target.value;

        this.changeTime(param);
    }

    handleChangeStartDate(event) {
        var param = {};

        param.entryIndex = event.target.getAttribute('data-entry');
        param.input = 'start';
        param.type = 'date';
        param.value = event.target.value;

        this.changeTime(param);
    }

    handleChangeEndDate(event) {
        var param = {};

        param.entryIndex = event.target.getAttribute('data-entry');
        param.input = 'end';
        param.type = 'date';
        param.value = event.target.value;

        this.changeTime(param);
    }

    changeTime(param) {
        var index, entry, timestamp;

        index = parseInt(param.entryIndex, 10);
        entry = timestamp = this.state.entries[index];

        if (param.input === 'end') {
            timestamp = entry.end;
        }
        if (param.input === 'start') {
            timestamp = entry.start;
        }

        if (timestamp !== undefined) {
            if (param.type === 'time') {
                timestamp.string.time = param.value;
            }
            if (param.type === 'date') {
                timestamp.string.date = param.value;
            }
        }

        this.calculateDiffForEntry(entry);
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

    calculateDiffs() {
        this.state.entries.forEach(entry => {
            this.calculateDiffForEntry(entry);
        });
    }

    calculateDiffForEntry(entry) {
        var start, startStr, end, endStr;

        if (
            entry !== undefined &&
            entry.start !== undefined &&
            entry.end !== undefined
        ) {
            startStr = entry.start.string.date + 'T' + entry.start.string.time;
            endStr = entry.end.string.date + 'T' + entry.end.string.time;

            start = new Date(startStr);
            end = new Date(endStr);

            entry.diff = (end - start) / (60 * 60 * 1000);
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
