import { LightningElement, api } from 'lwc';

export default class Entry extends LightningElement {
    @api
    get startDate() {
        return this.state.api.startDate;
    }
    set startDate(value) {
        this.state.api.startDate = value;
    }
    @api startTime;
    @api endDate;
    @api endTime;
    @api comment;

    state = { api: {} };
}
