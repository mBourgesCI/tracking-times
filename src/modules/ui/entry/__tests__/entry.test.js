import { createElement } from 'lwc';
import Entry from 'ui/entry';
describe('check elements for existence', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('outer container exists', () => {
        const element = createElement('ui-entry', { is: Entry });
        document.body.appendChild(element);

        const contentContainer = element.shadowRoot.querySelector(
            'div.content'
        );

        expect(contentContainer).toBeTruthy();
    });

    test('modal exists', () => {
        const element = createElement('ui-entry', { is: Entry });
        document.body.appendChild(element);

        const modalContainer = element.shadowRoot.querySelector('ui-modal');

        expect(modalContainer).toBeTruthy();
    });
});

describe('Check for Outputs', () => {
    test('start date output exists', () => {
        const element = createElement('ui-entry', { is: Entry });
        document.body.appendChild(element);

        const startDateOutput = element.shadowRoot.querySelector(
            'span.start-date'
        );

        expect(startDateOutput).toBeTruthy();
    });

    test('start time output exists', () => {
        const element = createElement('ui-entry', { is: Entry });
        document.body.appendChild(element);

        const startTimeOutput = element.shadowRoot.querySelector(
            'span.start-time'
        );

        expect(startTimeOutput).toBeTruthy();
    });

    test('end date output exists', () => {
        const element = createElement('ui-entry', { is: Entry });
        document.body.appendChild(element);

        const endDateOutput = element.shadowRoot.querySelector('span.end-date');

        expect(endDateOutput).toBeTruthy();
    });

    test('end time output exists', () => {
        const element = createElement('ui-entry', { is: Entry });
        document.body.appendChild(element);

        const endTimeOutput = element.shadowRoot.querySelector('span.end-time');

        expect(endTimeOutput).toBeTruthy();
    });

    test('comment output exists', () => {
        const element = createElement('ui-entry', { is: Entry });
        document.body.appendChild(element);

        const commentOutput = element.shadowRoot.querySelector('span.comment');

        expect(commentOutput).toBeTruthy();
    });
});

describe('Check for Inputs', () => {
    test('start date input exists', () => {
        const element = createElement('ui-entry', { is: Entry });
        document.body.appendChild(element);

        const startDateInput = element.shadowRoot.querySelector(
            'input.start-date'
        );

        expect(startDateInput).toBeTruthy();
    });
});
/*
describe('check inputs exist', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('component has an input for start date', () => {
        const startDate = '1900-01-01';
        const jsonInput = { start: { value: new Date(startDate).getTime() } };
        const element = createElement('ui-entry', { is: Entry });
        element.jsonInput = JSON.stringify(jsonInput);
        document.body.appendChild(element);

        const startDateInput = element.shadowRoot.querySelector(
            'input.start-date'
        );

        expect(startDateInput).toBeTruthy();
        expect(startDateInput.hasAttribute('type')).toBeTruthy();
        expect(startDateInput.getAttribute('type')).toBe('date');
        expect(startDateInput.value).toBeDefined();
        expect(startDateInput.value).toBe(startDate);
    });

    test('component has an input for start time', () => {
        const startTime = '01:00';
        const jsonInput = {
            start: {
                value: new Date('1970-01-01T' + startTime + 'Z').getTime()
            }
        };
        const element = createElement('ui-entry', { is: Entry });
        element.jsonInput = JSON.stringify(jsonInput);
        document.body.appendChild(element);

        const startTimeInput = element.shadowRoot.querySelector(
            'input.start-time'
        );
        expect(startTimeInput).toBeTruthy();
        expect(startTimeInput.hasAttribute('type')).toBeTruthy();
        expect(startTimeInput.getAttribute('type')).toBe('time');
        expect(startTimeInput.value).toBeDefined();
        expect(startTimeInput.value).toBe(startTime);
    });

    test('component has an input for end date', () => {
        const endDate = '1900-01-01';
        const jsonInput = { end: { value: new Date(endDate).getTime() } };
        const element = createElement('ui-entry', { is: Entry });
        element.jsonInput = JSON.stringify(jsonInput);
        element.endDate = endDate;
        document.body.appendChild(element);

        const endDateInput = element.shadowRoot.querySelector('input.end-date');

        expect(endDateInput).toBeTruthy();
        expect(endDateInput.hasAttribute('type')).toBeTruthy();
        expect(endDateInput.getAttribute('type')).toBe('date');
        expect(endDateInput.value).toBeDefined();
        expect(endDateInput.value).toBe(endDate);
    });

    test('component has an input for end time', () => {
        const endTime = '01:00';
        const jsonInput = {
            end: {
                value: new Date('1970-01-01T' + endTime + 'Z').getTime()
            }
        };
        const element = createElement('ui-entry', { is: Entry });
        element.jsonInput = JSON.stringify(jsonInput);
        document.body.appendChild(element);

        const endTimeInput = element.shadowRoot.querySelector('input.end-time');
        expect(endTimeInput).toBeTruthy();
        expect(endTimeInput.hasAttribute('type')).toBeTruthy();
        expect(endTimeInput.getAttribute('type')).toBe('time');
        expect(endTimeInput.value).toBeDefined();
        expect(endTimeInput.value).toBe(endTime);
    });

    test('component has an input for comments', () => {
        const comment = 'abcde';
        const jsonInput = {
            comment: comment
        };
        const element = createElement('ui-entry', { is: Entry });
        element.jsonInput = JSON.stringify(jsonInput);
        document.body.appendChild(element);

        const commentInput = element.shadowRoot.querySelector('input.comment');
        expect(commentInput).toBeTruthy();
        expect(commentInput.hasAttribute('type')).toBeTruthy();
        expect(commentInput.getAttribute('type')).toBe('text');
        expect(commentInput.value).toBeDefined();
        expect(commentInput.value).toBe(comment);
    });
});

describe('check outputs exsist', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('components has an output for start date', () => {
        const startDate = '1900-01-01';
        const jsonInput = { start: { value: new Date(startDate).getTime() } };

        const element = createElement('ui-entry', { is: Entry });
        element.jsonInput = JSON.stringify(jsonInput);
        document.body.appendChild(element);

        const startDateOutput = element.shadowRoot.querySelector(
            'span.start-date'
        );
        expect(startDateOutput).toBeTruthy();
        expect(startDateOutput.textContent).toBe(startDate);
    });

    test('components has an output for start time', () => {
        const startTime = '19:00';
        const jsonInput = {
            start: {
                value: new Date('1970-01-01T' + startTime + 'Z').getTime()
            }
        };

        const element = createElement('ui-entry', { is: Entry });
        element.jsonInput = JSON.stringify(jsonInput);
        document.body.appendChild(element);

        const commentOutput = element.shadowRoot.querySelector(
            'span.start-time'
        );
        expect(commentOutput).toBeTruthy();
        expect(commentOutput.textContent).toBe(startTime);
    });

    test('components has an output for end date', () => {
        const endDate = '1900-01-01';
        const jsonInput = { end: { value: new Date(endDate).getTime() } };

        const element = createElement('ui-entry', { is: Entry });
        element.jsonInput = JSON.stringify(jsonInput);
        element.endDate = endDate;
        document.body.appendChild(element);

        const commentOutput = element.shadowRoot.querySelector('span.end-date');
        expect(commentOutput).toBeTruthy();
        expect(commentOutput.textContent).toBe(endDate);
    });

    test('components has an output for end time', () => {
        const endTime = '19:00';
        const jsonInput = {
            end: {
                value: new Date('1970-01-01T' + endTime + 'Z').getTime()
            }
        };

        const element = createElement('ui-entry', { is: Entry });
        element.jsonInput = JSON.stringify(jsonInput);
        document.body.appendChild(element);

        const commentOutput = element.shadowRoot.querySelector('span.end-time');
        expect(commentOutput).toBeTruthy();
        expect(commentOutput.textContent).toBe(endTime);
    });

    test('components has an output for difference', () => {
        const element = createElement('ui-entry', { is: Entry });
        document.body.appendChild(element);

        const commentOutput = element.shadowRoot.querySelector('span.diff');
        expect(commentOutput).toBeTruthy();
    });

    test('components has an output for comment', () => {
        const comment = 'abcde';
        const jsonInput = {
            comment: comment
        };
        const element = createElement('ui-entry', { is: Entry });
        element.jsonInput = JSON.stringify(jsonInput);
        document.body.appendChild(element);

        const commentOutput = element.shadowRoot.querySelector('span.comment');
        expect(commentOutput).toBeTruthy();
        expect(commentOutput.textContent).toBe(comment);
    });
});

describe('inputs fire compond events with value if changed', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('event on start date change', () => {
        const startDate = '1900-01-01';
        const testvalue = '1900-01-02';
        const jsonInput = { start: { value: new Date(startDate).getTime() } };
        const handler = jest.fn();

        const element = createElement('ui-entry', { is: Entry });
        element.addEventListener('change', handler);
        element.jsonInput = JSON.stringify(jsonInput);
        document.body.appendChild(element);

        const startDateInput = element.shadowRoot.querySelector(
            'input.start-date'
        );
        startDateInput.value = testvalue;
        startDateInput.dispatchEvent(new CustomEvent('change', {}));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls.length).toBe(1);
        expect(handler.mock.calls[0].length).toBe(1);
        expect(handler.mock.calls[0][0]).toBeDefined();
        expect(handler.mock.calls[0][0].bubbles).toBe(true);
        expect(handler.mock.calls[0][0].composed).toBe(true);
        expect(handler.mock.calls[0][0].detail).toBeDefined();
        expect(handler.mock.calls[0][0].detail.value).toBe(
            new Date(testvalue).getTime()
        );
        expect(handler.mock.calls[0][0].detail.name).toBe('start');
    });

    test('event on start time change', () => {
        const startTime = '11:00';
        const jsonInput = {
            start: {
                value: new Date('1970-01-01T' + startTime + 'Z').getTime()
            }
        };
        const testvalue = '13:30';
        const handler = jest.fn();

        const element = createElement('ui-entry', { is: Entry });
        element.jsonInput = JSON.stringify(jsonInput);
        element.addEventListener('change', handler);
        document.body.appendChild(element);

        const startTimeInput = element.shadowRoot.querySelector(
            'input.start-time'
        );
        startTimeInput.value = testvalue;
        startTimeInput.dispatchEvent(new CustomEvent('change', {}));

        return Promise.resolve().then(() => {
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls.length).toBe(1);
            expect(handler.mock.calls[0].length).toBe(1);
            expect(handler.mock.calls[0][0]).toBeDefined();
            expect(handler.mock.calls[0][0].bubbles).toBe(true);
            expect(handler.mock.calls[0][0].composed).toBe(true);
            expect(handler.mock.calls[0][0].detail).toBeDefined();
            expect(handler.mock.calls[0][0].detail.name).toBe('start');
            expect(handler.mock.calls[0][0].detail.value).toBe(
                new Date('1970-01-01T' + testvalue + 'Z').getTime()
            );
        });
    });

    test('event on end date change', () => {
        const endDate = '1900-01-01';
        const testvalue = '1900-01-02';
        const jsonInput = { end: { value: new Date(endDate).getTime() } };
        const handler = jest.fn();

        const element = createElement('ui-entry', { is: Entry });
        element.jsonInput = JSON.stringify(jsonInput);
        element.addEventListener('change', handler);
        document.body.appendChild(element);

        const endDateInput = element.shadowRoot.querySelector('input.end-date');
        endDateInput.value = testvalue;
        endDateInput.dispatchEvent(new CustomEvent('change', {}));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls.length).toBe(1);
        expect(handler.mock.calls[0].length).toBe(1);
        expect(handler.mock.calls[0][0]).toBeDefined();
        expect(handler.mock.calls[0][0].bubbles).toBe(true);
        expect(handler.mock.calls[0][0].composed).toBe(true);
        expect(handler.mock.calls[0][0].detail).toBeDefined();
        expect(handler.mock.calls[0][0].detail.name).toBe('end');
        expect(handler.mock.calls[0][0].detail.value).toBe(
            new Date(testvalue).getTime()
        );
    });

    test('event on end time change', () => {
        const oldValue = '13:30';
        const newValue = '14:30';
        const handler = jest.fn();

        const jsonInput = {
            end: {
                value: new Date('1970-01-01T' + oldValue + 'Z').getTime()
            }
        };

        const element = createElement('ui-entry', { is: Entry });
        element.jsonInput = JSON.stringify(jsonInput);
        element.addEventListener('change', handler);
        document.body.appendChild(element);

        const endTimeInput = element.shadowRoot.querySelector('input.end-time');
        endTimeInput.value = newValue;
        endTimeInput.dispatchEvent(new CustomEvent('change', {}));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls.length).toBe(1);
        expect(handler.mock.calls[0].length).toBe(1);
        expect(handler.mock.calls[0][0]).toBeDefined();
        expect(handler.mock.calls[0][0].bubbles).toBe(true);
        expect(handler.mock.calls[0][0].composed).toBe(true);
        expect(handler.mock.calls[0][0].detail).toBeDefined();
        expect(handler.mock.calls[0][0].detail.value).toBe(
            new Date('1970-01-01T' + newValue + 'Z').getTime()
        );
        expect(handler.mock.calls[0][0].detail.name).toBe('end');
    });

    test('event on comment change', () => {
        const testvalue = 'abcde1234';
        const handler = jest.fn();

        const element = createElement('ui-entry', { is: Entry });
        element.addEventListener('change', handler);
        document.body.appendChild(element);

        const commentInput = element.shadowRoot.querySelector('input.comment');
        commentInput.value = testvalue;
        commentInput.dispatchEvent(new CustomEvent('change', {}));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls.length).toBe(1);
        expect(handler.mock.calls[0].length).toBe(1);
        expect(handler.mock.calls[0][0]).toBeDefined();
        expect(handler.mock.calls[0][0].bubbles).toBe(true);
        expect(handler.mock.calls[0][0].composed).toBe(true);
        expect(handler.mock.calls[0][0].detail).toBeDefined();
        expect(handler.mock.calls[0][0].detail.value).toBe(testvalue);
        expect(handler.mock.calls[0][0].detail.name).toBe('comment');
    });
});

describe('behavior on change', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('start date output gets updated on input change.', () => {
        const startDate = '1900-01-01';
        const jsonInput = { start: { value: new Date(startDate).getTime() } };

        const newValue = '1900-01-02';

        const element = createElement('ui-entry', { is: Entry });
        element.jsonInput = JSON.stringify(jsonInput);
        document.body.appendChild(element);

        const startDateInput = element.shadowRoot.querySelector(
            'input.start-date'
        );

        startDateInput.value = newValue;
        startDateInput.dispatchEvent(new CustomEvent('change'));

        return Promise.resolve().then(() => {
            const startDateOutput = element.shadowRoot.querySelector(
                'span.start-date'
            );
            expect(startDateOutput.textContent).toBe(newValue);
        });
    });

    test('start time output gets updated on input change.', () => {
        const oldValue = '13:00';
        const newValue = '14:00';
        const jsonInput = {
            start: { value: new Date('1970-01-01T' + oldValue + 'Z').getTime() }
        };

        const element = createElement('ui-entry', { is: Entry });
        element.jsonInput = JSON.stringify(jsonInput);
        document.body.appendChild(element);

        const startTimeInput = element.shadowRoot.querySelector(
            'input.start-time'
        );

        startTimeInput.value = newValue;
        startTimeInput.dispatchEvent(new CustomEvent('change'));

        return Promise.resolve().then(() => {
            const startTimeOutput = element.shadowRoot.querySelector(
                'span.start-time'
            );
            expect(startTimeOutput.textContent).toBe(newValue);
        });
    });

    test('end date output gets updated on input change.', () => {
        const oldValue = '1900-01-01';
        const newValue = '1900-01-02';
        const jsonInput = {
            end: { value: new Date(oldValue).getTime() }
        };

        const element = createElement('ui-entry', { is: Entry });
        element.jsonInput = JSON.stringify(jsonInput);
        document.body.appendChild(element);

        const endDateInput = element.shadowRoot.querySelector('input.end-date');

        endDateInput.value = newValue;
        endDateInput.dispatchEvent(new CustomEvent('change'));

        return Promise.resolve().then(() => {
            const endDateOutput = element.shadowRoot.querySelector(
                'span.end-date'
            );
            expect(endDateOutput.textContent).toBe(newValue);
        });
    });

    test('end time output gets updated on input change.', () => {
        const oldValue = '13:00';
        const newValue = '14:00';
        const jsonInput = {
            end: { value: new Date('1970-01-01T' + oldValue + 'Z').getTime() }
        };

        const element = createElement('ui-entry', { is: Entry });
        element.jsonInput = JSON.stringify(jsonInput);
        document.body.appendChild(element);

        const endTimeInput = element.shadowRoot.querySelector('input.end-time');
        endTimeInput.value = newValue;
        endTimeInput.dispatchEvent(new CustomEvent('change'));

        return Promise.resolve().then(() => {
            const endTimeOutput = element.shadowRoot.querySelector(
                'span.end-time'
            );
            expect(endTimeOutput.textContent).toBe(newValue);
        });
    });

    test('difference is calculated initialy.', () => {
        const jsonInput = {
            start: { value: new Date('1970-01-01T00:00:00.0000Z').getTime() },
            end: { value: new Date('1970-01-01T01:00:00.0000Z').getTime() }
        };

        const element = createElement('ui-entry', { is: Entry });
        element.jsonInput = JSON.stringify(jsonInput);
        document.body.appendChild(element);

        const diffOutput = element.shadowRoot.querySelector('span.diff');

        expect(diffOutput.textContent).toBe('1');
    });

    test('difference is calculated on change.', () => {
        const newEndTime = '15:00';

        const jsonInput = {
            start: { value: new Date('1970-01-01T13:00:00.0000Z').getTime() },
            end: { value: new Date('1970-01-01T14:00:00.0000Z').getTime() }
        };

        const element = createElement('ui-entry', { is: Entry });
        element.jsonInput = JSON.stringify(jsonInput);
        document.body.appendChild(element);

        const endTimeInput = element.shadowRoot.querySelector('input.end-time');
        endTimeInput.value = newEndTime;
        endTimeInput.dispatchEvent(new CustomEvent('change'));

        return Promise.resolve().then(() => {
            const diffOutput = element.shadowRoot.querySelector('span.diff');
            expect(diffOutput.textContent).toBe('2');
        });
    });

    describe('component can read version 0.3 data', () => {
        test('simple input', () => {
            var startStamp, endStamp, comment, versionString;
            startStamp = 0;
            endStamp = 1800000;
            comment = 'new entry';
            versionString = 'v0.3';

            const element = createElement('ui-entry', { is: Entry });
            element.version = versionString;
            element.start = startStamp;
            element.end = endStamp;
            element.comment = comment;
            document.body.appendChild(element);

            const spans = element.shadowRoot.querySelectorAll('span');
            expect(spans).toBeTruthy();
            expect(spans.length).toBe(6);
            expect(spans[0].classList[0]).toBe('start-date');
            expect(spans[0].textContent).toBe('1970-01-01');
            expect(spans[1].classList[0]).toBe('start-time');
            expect(spans[1].textContent).toBe('00:00');
            expect(spans[2].classList[0]).toBe('end-date');
            expect(spans[2].textContent).toBe('1970-01-01');
            expect(spans[3].classList[0]).toBe('end-time');
            expect(spans[3].textContent).toBe('00:30');
            expect(spans[4].classList[0]).toBe('diff');
            expect(spans[4].textContent).toBe('0.5');
            expect(spans[5].classList[0]).toBe('comment');
            expect(spans[5].textContent).toBe(comment);
        });
    });
});
*/
