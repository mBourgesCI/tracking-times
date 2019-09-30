/* eslint-disable no-unused-vars */
import { LightningElement, track } from 'lwc';
import { save, load, clear } from 'data/localStorage';

export default class TimeTracking extends LightningElement {
    timestamps = [];
    @track entryPairs = [];
    @track state = {};

    connectedCallback() {
        this.state.entries = [];
        this.loadData();
    }

    refreshTimePairList() {
        this.entryPairs = [];
        for (let index = 0; index < this.timestamps.length; index++) {
            const element = this.timestamps[index];
            if (index % 2 === 0) {
                let newEntry = {
                    id: this.entryPairs.length,
                    start: element.timeStamp
                };
                this.entryPairs.push(newEntry);
            }
            if (index % 2 === 1) {
                let entry = this.entryPairs[this.entryPairs.length - 1];
                entry.end = element.timeStamp;
            }
        }
    }

    handleCick() {
        let timeStamp = new Date();
        let id = this.timestamps === null ? 0 : this.timestamps.length;

        var obj = {
            timeStamp: timeStamp.getTime(),
            id: id
        };

        this.timestamps.push(obj);
        this.refreshTimePairList();
    }

    handleLoadBtnClick() {
        this.loadData();
    }

    handleSaveBtnClick() {
        this.saveData();
    }

    handleClearBtnClick() {
        this.clearData();
        this.refreshTimePairList();
    }

    clearData() {
        this.timestamps = [];
        clear();
    }

    saveData() {
        save(this.timestamps);
    }

    loadData() {
        this.timestamps = load();
        if (this.timestamps === null) {
            this.timestamps = [];
        }
        this.refreshTimePairList();
    }

    handleChangeTimestamp(event) {
        var identifier, newValue;

        identifier = event.detail.identifier;
        newValue = event.detail.newValue;

        let keys = identifier.split('-');

        let timestampindex = keys[0] * 2 + (keys[1] === 'start' ? 0 : 1);

        this.timestamps[timestampindex].timeStamp = newValue;
    }

    addTimeStamp() {
        var entries;

        let timeStamp = this.createTimeStamp();

        entries = this.getEntries();

        let newPairId = entries === null ? 0 : entries.length;

        if (entries.length === 0) {
            // add new item with timestamp as start
        } else {
            if (entries[entries.length - 1].end !== undefined) {
                // set timestamp as end time
            } else {
                // add new item with timestamp as start
            }
        }
    }

    createTimeStamp() {
        return new Date();
    }

    getEntries() {
        return this.state.entries;
    }
}
