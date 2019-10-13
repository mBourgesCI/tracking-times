import { LightningElement, api, track } from 'lwc';

export default class Entry extends LightningElement {
    @api
    get jsonInput() {
        return {};
    }
    set jsonInput(value) {
        var comment, startTimeStamp, endTimeStamp;

        if (value !== undefined) {
            if (value.comment !== undefined) {
                comment = value.comment;
                this.internalState.comment = comment;
            }
            if (value.start !== undefined && value.start.value !== undefined) {
                startTimeStamp = value.start.value;
                this.internalState.startTimeStamp = startTimeStamp;
                this.setDisplayStartDate();
                this.setDisplayStartTime();
            }
            if (value.end !== undefined && value.end.value !== undefined) {
                endTimeStamp = value.end.value;
                this.internalState.endTimeStamp = endTimeStamp;
            }
        }
    }

    internalState = {};

    @track
    displayState = {};

    setDisplayStartDate() {
        this.displayState.startdate = this.extractDateStringFromTimeStamp(
            this.internalState.startTimeStamp
        );
    }

    setDisplayStartTime() {
        this.displayState.starttime = this.extractTimeStringFromTimeStamp(
            this.internalState.startTimeStamp
        );
    }

    extractDateStringFromTimeStamp(timestamp) {
        var fullDate, dateString;
        fullDate = new Date(timestamp);
        dateString = fullDate.toISOString().split('T')[0];
        return dateString;
    }

    extractTimeStringFromTimeStamp(timestamp) {
        var fullDate, timeString;

        fullDate = new Date(timestamp);
        timeString = fullDate
            .toISOString()
            .split('T')[1]
            .substr(0, 5);

        return timeString;
    }

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

    get difference() {
        var startTimestamp = this.startDate + 'T' + this.startTime;
        var endTimestamp = this.endDate + 'T' + this.endTime;

        let startDate = new Date(startTimestamp);
        let endDate = new Date(endTimestamp);

        let difference = endDate - startDate;
        return difference / (1000 * 60 * 60);
    }

    @track
    state = { api: {} };

    handleChangeStartDate(internalEvent) {
        var newStartDate, param;
        if (this.internalState.startTimeStamp !== undefined) {
            let separatedTimestamp = splitTimeStampIntegerIntoDateAndTime(
                this.internalState.startTimeStamp
            );

            newStartDate = new Date(internalEvent.target.value).getTime();
            this.internalState.startTimeStamp =
                newStartDate + separatedTimestamp.time;
            this.setDisplayStartDate();

            param = {
                value: this.displayState.startdate,
                name: 'start-date'
            };
            this.createAndFireChangeEvent(param);
        }
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
        this.endTime = internalEvent.target.value;
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

function splitTimeStampIntegerIntoDateAndTime(timestamp) {
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    var intValue, timeInt, dateInt, result;
    if (timestamp !== undefined) {
        intValue = parseInt(timestamp, 10);

        timeInt = intValue % MILLISECONDS_PER_DAY;
        dateInt = intValue - timeInt;

        result = { date: dateInt, time: timeInt };
        return result;
    }
    return undefined;
}
