/* eslint-disable no-unused-vars */
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
                this.setDisplayEndDate();
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

    setDisplayEndDate() {
        this.displayState.enddate = this.extractDateStringFromTimeStamp(
            this.internalState.endTimeStamp
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

    getStartDate() {
        return splitTimeStampIntegerIntoDateAndTime(
            this.internalState.startTimeStamp
        ).date;
    }

    getStartTime() {
        return splitTimeStampIntegerIntoDateAndTime(
            this.internalState.startTimeStamp
        ).time;
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
        this.processNewStartDate(internalEvent.target.value);
    }

    handleChangeStartTime(internalEvent) {
        this.processNewStartTime(internalEvent.target.value);
    }

    handleChangeEndDate(internalEvent) {
        this.processNewEndDate(internalEvent.target.value);
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

    processNewStartDate(newStartDateISOString) {
        var param;
        if (this.internalState.startTimeStamp !== undefined) {
            let currentTimeValue = extractTimeFromTimestamp(
                this.internalState.startTimeStamp
            );
            let newDateValue = convertISODateToInteger(newStartDateISOString);
            this.internalState.startTimeStamp = newDateValue + currentTimeValue;
            this.setDisplayStartDate();

            param = {
                value: this.displayState.startdate,
                name: 'start-date'
            };
            this.createAndFireChangeEvent(param);
        }
    }

    processNewStartTime(newStartDateISOString) {
        var param;

        if (this.internalState.startTimeStamp !== undefined) {
            let currentDateValue = extractDateFromTimestamp(
                this.internalState.startTimeStamp
            );
            let newTimeValue = convertISOTimeToInteger(newStartDateISOString);
            this.internalState.startTimeStamp = currentDateValue + newTimeValue;
            this.setDisplayStartTime();
        }

        param = {
            value: this.displayState.starttime,
            name: 'start-time'
        };
        this.createAndFireChangeEvent(param);
    }

    processNewEndDate(newEndDateISOString) {
        var param;


        if (this.internalState.endTimeStamp !== undefined) {
            let currentTimeValue = extractTimeFromTimestamp(
                this.internalState.endTimeStamp
            );
            let newDateValue = convertISODateToInteger(newEndDateISOString);
            this.internalState.endTimeStamp = newDateValue + currentTimeValue;

            this.setDisplayEndDate();

            param = {
                value: this.displayState.enddate,
                name: 'end-date'
            };
            this.createAndFireChangeEvent(param);
        }
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

function setTimeStringOfIntegerTimeStamp(params) {
    var timeStampArray, timeStringValue, newTimeStamp;

    // Guardians
    if (params === undefined) return undefined;
    if (params.originalTimeStamp === undefined) return undefined;
    if (params.timeString === undefined) return undefined;

    // Business logic
    timeStampArray = splitTimeStampIntegerIntoDateAndTime(
        params.originalTimeStamp
    );
    timeStringValue = convertISOTimeToInteger(params.timeString);

    newTimeStamp = timeStampArray.date + timeStringValue;
    return newTimeStamp;
}

function convertISOTimeToInteger(time) {
    return new Date('1970-01-01T' + time + 'Z').getTime();
}

function convertISODateToInteger(date) {
    return new Date(date + 'T00:00:00.0000Z').getTime();
}

function extractTimeFromTimestamp(timestamp) {
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    return timestamp % MILLISECONDS_PER_DAY;
}

function extractDateFromTimestamp(timestamp) {
    let time = extractTimeFromTimestamp(timestamp);
    return timestamp - time;
}

function splitTimeStampIntegerIntoDateAndTime(timestamp) {
    var result;
    if (timestamp !== undefined) {
        result = {
            date: extractDateFromTimestamp(timestamp),
            time: extractTimeFromTimestamp(timestamp)
        };
        return result;
    }
    return undefined;
}
