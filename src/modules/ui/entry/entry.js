/* eslint-disable no-unused-vars */
import { LightningElement, api, track } from 'lwc';
import { thisTypeAnnotation } from '@babel/types';

export default class Entry extends LightningElement {
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
        let integerValue;
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
        let integerValue;
        if (value !== undefined) {
            integerValue = parseInt(value, 10);
            this.internalState.endTimeStamp = integerValue;
            this.setDisplayEndDate();
            this.setDisplayEndTime();
        }
    }

    internalState = {};

    label = {
        modal: {
            title: 'Entry Details'
        },
        button: {
            edit: 'Edit',
            delete: 'Delete',
            save: 'Save',
            cancel: 'Cancel'
        },
        input: {
            startdate: 'Start date',
            starttime: 'Start time',
            enddate: 'End date',
            endtime: 'End time',
            comment: 'Comment'
        }
    };

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
        let fullDate, dateString;
        fullDate = new Date(timestamp);
        dateString = fullDate.toISOString().split('T')[0];
        return dateString;
    }

    extractTimeStringFromTimeStamp(timestamp) {
        let fullDate, timeString;

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

    //----------------------------
    // event handlers
    //----------------------------

    handleButtonClickModalSave() {
        this.processModalSave();
    }

    handleButtonClickModalCancel() {
        this.processModalCancel();
    }

    handleButtonClickEdit() {
        this.processEdit();
    }

    handleButtonClickDelete() {
        this.getDeleteModal().show();
    }

    handleButtonClickDeleteConfirm() {
        this.getDeleteModal().hide();
        this.processDelete();
    }

    handleButtonClickDeleteCancel() {
        this.getDeleteModal().hide();
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

    //----------------------------
    // process events
    //----------------------------

    processModalSave() {
        let inputValues;

        this.getEditModal().hide();
        inputValues = this.readModalInputs();
        this.writeValuesToInternalState(inputValues);
        this.fillOutputs();
        this.createAndFireChangeEvent();
    }

    processModalCancel() {
        this.getEditModal().hide();
    }

    processNewStartDate(newStartDateISOString) {
        let param;
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
        }
    }

    processNewStartTime(newStartDateISOString) {
        let param, currentTimeStamp, newTimeStamp;

        currentTimeStamp = this.internalState.startTimeStamp;

        if (currentTimeStamp !== undefined) {
            newTimeStamp = getNewTimestampByIsoTime(
                currentTimeStamp,
                newStartDateISOString
            );
            this.internalState.startTimeStamp = newTimeStamp;
            this.setDisplayStartTime();
        }

        param = {
            value: this.internalState.startTimeStamp,
            name: 'start'
        };
    }

    processNewEndDate(newEndDateISOString) {
        let param;

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
        }
    }

    processNewEndTime(newEndTimeISOString) {
        let param, currentTimeStamp, newTimeStamp;

        currentTimeStamp = this.internalState.endTimeStamp;

        if (currentTimeStamp !== undefined) {
            newTimeStamp = getNewTimestampByIsoTime(
                currentTimeStamp,
                newEndTimeISOString
            );
            this.internalState.endTimeStamp = newTimeStamp;
            this.setDisplayEndTime();
        }

        param = {
            value: this.internalState.endTimeStamp,
            name: 'end'
        };
    }

    processNewComment(newCommentString) {
        let param;

        this.internalState.comment = newCommentString;
        this.setDisplayStateComment();
        param = {
            value: newCommentString,
            name: 'comment'
        };
    }

    processDelete() {
        this.dispatchEvent(new CustomEvent('delete'));
    }

    processEdit() {
        this.fillModalInputs();
        this.getEditModal().show();
    }

    createAndFireChangeEvent() {
        let externalEvent;
        externalEvent = new CustomEvent('change', {
            bubbles: true,
            composed: true,
            detail: {
                start: this.start,
                end: this.end,
                comment: this.comment
            }
        });
        this.dispatchEvent(externalEvent);
    }

    getValuesForInputs() {
        let result, start, end;
        result = {};

        if (this.isStartDefined()) {
            start = new Date(this.internalState.startTimeStamp);
            result.startdate = start.toISOString().split('T')[0];
            result.starttime = start.toLocaleTimeString().substr(0, 5);
        }
        if (this.isEndDefined()) {
            end = new Date(this.internalState.endTimeStamp);
            result.enddate = end.toISOString().split('T')[0];
            result.endtime = end.toLocaleTimeString().substr(0, 5);
        }
        result.comment = this.internalState.comment;
        return result;
    }

    setStateValues(param) {
        this.internalState.startTimeStamp = param.start;
        this.internalState.endTimeStamp = param.end;
        this.internalState.comment = param.comment;
    }

    //----------------------
    // Output handlers
    //----------------------

    fillOutputs() {
        let values;
        values = this.getValuesForInputs();
        this.displayState.startdate = values.startdate;
        this.displayState.starttime = values.starttime;
        this.displayState.enddate = values.enddate;
        this.displayState.endtime = values.endtime;
        this.displayState.comment = values.comment;
    }

    writeValuesToInternalState(values) {
        let start, end, comment;
        start = new Date(values.startDateStr + 'T' + values.startTimeStr);
        end = new Date(values.endDateStr + 'T' + values.endTimeStr);
        comment = values.comment;
        this.internalState.startTimeStamp = start.getTime();
        this.internalState.endTimeStamp = end.getTime();
        this.internalState.comment = comment;
    }

    //----------------------
    // Modal handlers
    //----------------------

    fillModalInputs() {
        let values;
        values = this.getValuesForInputs();
        this.getInputStartDate().value = values.startdate;
        this.getInputStartTime().value = values.starttime;
        this.getInputEndDate().value = values.enddate;
        this.getInputEndTime().value = values.endtime;
        this.getInputComment().value = values.comment;
    }

    readModalInputs() {
        let values;
        values = {};
        values.startDateStr = this.getInputStartDate().value;
        values.startTimeStr = this.getInputStartTime().value;
        values.endDateStr = this.getInputEndDate().value;
        values.endTimeStr = this.getInputEndTime().value;
        values.comment = this.getInputComment().value;
        return values;
    }

    /**
     * --------------------
     * value Checker
     * --------------------
     */

    isStartDefined() {
        if (this.internalState.startTimeStamp === undefined) {
            return false;
        }
        if (this.internalState.startTimeStamp === null) {
            return false;
        }
        if (isNaN(this.internalState.startTimeStamp)) {
            return false;
        }
        if (this.internalState.startTimeStamp === '') {
            return false;
        }
        return true;
    }

    isEndDefined() {
        if (this.internalState.endTimeStamp === undefined) {
            return false;
        }
        if (this.internalState.endTimeStamp === null) {
            return false;
        }
        if (isNaN(this.internalState.endTimeStamp)) {
            return false;
        }
        if (this.internalState.endTimeStamp === '') {
            return false;
        }
        return true;
    }

    //----------------------
    // Element selectors
    //----------------------

    getDeleteModal() {
        return this.template.querySelector('.modal-delete');
    }

    getEditModal() {
        return this.template.querySelector('.modal-edit');
    }

    getInputStartDate() {
        return this.template.querySelector('input.start-date');
    }

    getInputStartTime() {
        return this.template.querySelector('input.start-time');
    }

    getInputEndDate() {
        return this.template.querySelector('input.end-date');
    }

    getInputEndTime() {
        return this.template.querySelector('input.end-time');
    }

    getInputComment() {
        return this.template.querySelector('textarea.comment');
    }

    getSpanStartDate() {
        return this.template.querySelector('span.start-date');
    }

    getSpanStartTime() {
        return this.template.querySelector('span.start-time');
    }

    getSpanEndDate() {
        return this.template.querySelector('span.end-date');
    }

    getSpanEndTime() {
        return this.template.querySelector('span.end-time');
    }

    getSpanComment() {
        return this.template.querySelector('span.comment');
    }
}

function getNewTimestampByIsoTime(timestamp, isoTimeString) {
    let splittedTime, hourInt, minuteInt, newTimeStamp;
    if (timestamp !== undefined) {
        splittedTime = isoTimeString.split(':');
        hourInt = parseInt(splittedTime[0], 10);
        minuteInt = parseInt(splittedTime[1], 10);

        newTimeStamp = new Date(timestamp).setHours(hourInt, minuteInt);
    }
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
    let result;
    if (timestamp !== undefined) {
        result = {
            date: extractDateFromTimestamp(timestamp),
            time: extractTimeFromTimestamp(timestamp)
        };
        return result;
    }
    return undefined;
}
