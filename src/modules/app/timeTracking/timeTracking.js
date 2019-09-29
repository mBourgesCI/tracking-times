import { LightningElement, track } from 'lwc';
import { Storage } from 'data/localStorage';

export default class TimeTracking extends LightningElement {
    timestamps = [];
    @track entryPairs = [];
    @track state = {};

    connectedCallback() {
        this.state.data = [];
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
        var storage = new Storage();

        this.timestamps = [];
        storage.clear();
    }

    saveData() {
        var storage = new Storage();
        storage.save(this.timestamps);
    }

    loadData() {
        var storage = new Storage();
        this.timestamps = storage.load();
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

    addTimeStamp() {}
}
