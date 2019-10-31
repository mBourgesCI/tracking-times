/* eslint-disable no-unused-vars */
import { LightningElement, api, track } from 'lwc';

export default class Entry extends LightningElement {
    @api
    get jsonInput() {
        return {};
    }
    set jsonInput(jsonString) {
        var value, comment, startTimeStamp, endTimeStamp;

        if (jsonString !== undefined) {
            value = JSON.parse(jsonString);

            if (value !== undefined) {
                if (value.comment !== undefined) {
                    comment = value.comment;
                    this.internalState.comment = comment;
                    this.setDisplayStateComment();
                } else {
                    this.internalState.comment = '';
                    this.setDisplayStateComment();
                }
                if (
                    value.start !== undefined &&
                    value.start.value !== undefined
                ) {
                    startTimeStamp = value.start.value;
                    this.internalState.startTimeStamp = startTimeStamp;
                    this.setDisplayStartDate();
                    this.setDisplayStartTime();
                }
                if (value.end !== undefined && value.end.value !== undefined) {
                    endTimeStamp = value.end.value;
                    this.internalState.endTimeStamp = endTimeStamp;
                    this.setDisplayEndDate();
                    this.setDisplayEndTime();
                }
                if (value.id !== undefined) {
                    this.internalState.entryId = value.id;
                }
            }
        }
    }

    @api
    get version() {
        return this.internalState.version;
    }
    set version(value) {
        if (value !== undefined) {
            this.internalState.version = value;
        }
    }

    @api
    get comment() {
        return this.internalState.comment;
    }
    set comment(value) {
        if (value !== undefined) {
            this.internalState.comment = value;
            this.setDisplayStateComment();
        }
    }

    @api
    get start() {
        return this.internalState.startTimeStamp;
    }
    set start(value) {
        var integerValue;
        if (value !== undefined) {
            integerValue = parseInt(value, 10);
            this.internalState.startTimeStamp = integerValue;
            this.setDisplayStartDate();
            this.setDisplayStartTime();
        }
    }

    @api
    get end() {
        return this.internalState.endTimeStamp;
    }
    set end(value) {
        var integerValue;
        if (value !== undefined) {
            integerValue = parseInt(value, 10);
            this.internalState.endTimeStamp = integerValue;
            this.setDisplayEndDate();
            this.setDisplayEndTime();
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

    setDisplayEndTime() {
        this.displayState.endtime = this.extractTimeStringFromTimeStamp(
            this.internalState.endTimeStamp
        );
    }

    setDisplayStateComment() {
        this.displayState.comment = this.internalState.comment;
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
        timeString = fullDate.toLocaleTimeString().substr(0, 5);

        return timeString;
    }

    get difference() {
        let startDate = this.internalState.startTimeStamp;
        let endDate = this.internalState.endTimeStamp;

        let difference = endDate - startDate;
        return difference / (1000 * 60 * 60);
    }

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
        this.processNewEndTime(internalEvent.target.value);
    }

    handleChangeComment(internalEvent) {
        this.processNewComment(internalEvent.target.value);
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
                value: this.internalState.startTimeStamp,
                name: 'start'
            };
            this.createAndFireChangeEvent(param);
        }
    }

    processNewStartTime(newStartDateISOString) {
        var param, splittedTime, newTimeStamp, hourInt, minuteInt;

        if (this.internalState.startTimeStamp !== undefined) {
            splittedTime = newStartDateISOString.split(':');
            hourInt = parseInt(splittedTime[0], 10);
            minuteInt = parseInt(splittedTime[1], 10);
            newTimeStamp = new Date(this.internalState.startTimeStamp).setHours(
                hourInt,
                minuteInt
            );

            this.internalState.startTimeStamp = newTimeStamp;
            this.setDisplayStartTime();
        }

        param = {
            value: this.internalState.startTimeStamp,
            name: 'start'
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
                value: this.internalState.endTimeStamp,
                name: 'end'
            };
            this.createAndFireChangeEvent(param);
        }
    }

    processNewEndTime(newEndTimeISOString) {
        var param;

        if (this.internalState.endTimeStamp !== undefined) {
            let currentDateValue = extractDateFromTimestamp(
                this.internalState.endTimeStamp
            );
            let newTimeValue = convertISOTimeToInteger(newEndTimeISOString);
            this.internalState.endTimeStamp = currentDateValue + newTimeValue;

            this.setDisplayEndTime();

            param = {
                value: this.internalState.endTimeStamp,
                name: 'end'
            };
            this.createAndFireChangeEvent(param);
        }
    }

    processNewComment(newCommentString) {
        var param;

        this.internalState.comment = newCommentString;
        this.setDisplayStateComment();
        param = {
            value: newCommentString,
            name: 'comment'
        };
        this.createAndFireChangeEvent(param);
    }

    createAndFireChangeEvent(detailParam) {
        var externalEvent;
        detailParam.entryId = this.internalState.entryId;
        externalEvent = new CustomEvent('change', {
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
