import { createElement } from 'lwc';
import Entry from 'ui/entry';
describe('static tests', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('outer ccontainer exists', () => {
        const element = createElement('ui-entry', { is: Entry });
        document.body.appendChild(element);

        const contentContainer = element.shadowRoot.querySelector(
            'div.content'
        );

        expect(contentContainer).toBeTruthy();
    });
});

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
        element.jsonInput = jsonInput;
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
        element.jsonInput = jsonInput;
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
        element.jsonInput = jsonInput;
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
        element.jsonInput = jsonInput;
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
        const element = createElement('ui-entry', { is: Entry });
        element.comment = comment;
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
        element.jsonInput = jsonInput;
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
        element.jsonInput = jsonInput;
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
        element.jsonInput = jsonInput;
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
        element.jsonInput = jsonInput;
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

        const element = createElement('ui-entry', { is: Entry });
        element.comment = comment;
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
        element.jsonInput = jsonInput;
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
        expect(handler.mock.calls[0][0].detail.value).toBe(testvalue);
        expect(handler.mock.calls[0][0].detail.name).toBe('start-date');
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
        element.jsonInput = jsonInput;
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
            expect(handler.mock.calls[0][0].detail.name).toBe('start-time');
            expect(handler.mock.calls[0][0].detail.value).toBe(testvalue);
        });
    });

    test('event on end date change', () => {
        const endDate = '1900-01-01';
        const testvalue = '1900-01-02';
        const jsonInput = { end: { value: new Date(endDate).getTime() } };
        const handler = jest.fn();

        const element = createElement('ui-entry', { is: Entry });
        element.jsonInput = jsonInput;
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
        expect(handler.mock.calls[0][0].detail.name).toBe('end-date');
        expect(handler.mock.calls[0][0].detail.value).toBe(testvalue);
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
        element.jsonInput = jsonInput;
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
        expect(handler.mock.calls[0][0].detail.value).toBe(newValue);
        expect(handler.mock.calls[0][0].detail.name).toBe('end-time');
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
        element.jsonInput = jsonInput;
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
        element.jsonInput = jsonInput;
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
        element.jsonInput = jsonInput;
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
        element.jsonInput = jsonInput;
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
        element.jsonInput = jsonInput;
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
        element.jsonInput = jsonInput;
        document.body.appendChild(element);

        const endTimeInput = element.shadowRoot.querySelector('input.end-time');
        endTimeInput.value = newEndTime;
        endTimeInput.dispatchEvent(new CustomEvent('change'));

        return Promise.resolve().then(() => {
            const diffOutput = element.shadowRoot.querySelector('span.diff');
            expect(diffOutput.textContent).toBe('2');
        });
    });
});
