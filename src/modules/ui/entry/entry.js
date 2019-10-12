import { LightningElement, api, track } from 'lwc';

export default class Entry extends LightningElement {
    @api
    get startDate() {
        return this.state.api.startDate;
    }
    set startDate(value) {
        this.state.api.startDate = value;
    }

    @api
    get startTime() {
        return this.state.api.startTime;
    }
    set startTime(value) {
        this.state.api.startTime = value;
    }

    @api
    get endDate() {
        return this.state.api.endDate;
    }
    set endDate(value) {
        this.state.api.endDate = value;
    }

    @api
    get endTime() {
        return this.state.api.endTime;
    }
    set endTime(value) {
        this.state.api.endTime = value;
    }

    @api
    get comment() {
        return this.state.api.comment;
    }
    set comment(value) {
        this.state.api.comment = value;
    }

    @track
    state = { api: {} };

    handleChangeStartDate(internalEvent) {
        var param = {
            value: internalEvent.target.value,
            name: 'start-date'
        };
        this.startDate = internalEvent.target.value;
        this.createAndFireChangeEvent(param);
    }

    handleChangeStartTime(internalEvent) {
        var param = {
            value: internalEvent.target.value,
            name: 'start-time'
        };
        this.startTime = internalEvent.target.value;
        this.createAndFireChangeEvent(param);
    }

    handleChangeEndDate(internalEvent) {
        var param = {
            value: internalEvent.target.value,
            name: 'end-date'
        };
        this.endDate = internalEvent.target.value;
        this.createAndFireChangeEvent(param);
    }

    handleChangeEndTime(internalEvent) {
        var param = {
            value: internalEvent.target.value,
            name: 'end-time'
        };
        this.createAndFireChangeEvent(param);
    }

    handleChangeComment(internalEvent) {
        var param = {
            value: internalEvent.target.value,
            name: 'comment'
        };
        this.createAndFireChangeEvent(param);
    }

    createAndFireChangeEvent(detailParam) {
        var externalEvent = new CustomEvent('change', {
            bubbles: true,
            composed: true,
            detail: detailParam
        });
        this.dispatchEvent(externalEvent);
    }
}
