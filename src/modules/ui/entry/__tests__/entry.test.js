import { createElement } from 'lwc';
import Entry from 'ui/entry';
describe('check elements for existence', () => {
    afterEach(() => {
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
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

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

    test('difference output exists', () => {
        const element = createElement('ui-entry', { is: Entry });
        document.body.appendChild(element);

        const component = element.shadowRoot.querySelector('span.diff');

        expect(component).toBeTruthy();
    });
});

describe('Check for Inputs', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('start date input exists', () => {
        const element = createElement('ui-entry', { is: Entry });
        document.body.appendChild(element);

        const component = element.shadowRoot.querySelector('input.start-date');

        expect(component).toBeTruthy();
    });

    test('start time input exists', () => {
        const element = createElement('ui-entry', { is: Entry });
        document.body.appendChild(element);

        const component = element.shadowRoot.querySelector('input.start-time');

        expect(component).toBeTruthy();
    });

    test('end date input exists', () => {
        const element = createElement('ui-entry', { is: Entry });
        document.body.appendChild(element);

        const component = element.shadowRoot.querySelector('input.end-date');

        expect(component).toBeTruthy();
    });

    test('end time input exists', () => {
        const element = createElement('ui-entry', { is: Entry });
        document.body.appendChild(element);

        const component = element.shadowRoot.querySelector('input.end-time');

        expect(component).toBeTruthy();
    });

    test('comment input exists', () => {
        const element = createElement('ui-entry', { is: Entry });
        document.body.appendChild(element);

        const component = element.shadowRoot.querySelector('input.comment');

        expect(component).toBeTruthy();
    });

    test('edit button exists', () => {
        const element = createElement('ui-entry', { is: Entry });
        document.body.appendChild(element);

        const component = element.shadowRoot.querySelector('input.edit');

        expect(component).toBeTruthy();
    });
});

describe('check initial values', () => {
    test('output start date', () => {
        const probeTimestamp = new Date('2000-01-01T13:00:00.0000').getTime();

        const element = createElement('ui-entry', { is: Entry });
        element.start = probeTimestamp;
        document.body.appendChild(element);

        const startDateOutput = element.shadowRoot.querySelector(
            'span.start-date'
        );

        expect(startDateOutput).toBeTruthy();
        expect(startDateOutput.textContent).toBe('2000-01-01');
    });

    test('output start time', () => {
        const probeTimestamp = new Date('2000-01-01T13:00:00.0000').getTime();

        const element = createElement('ui-entry', { is: Entry });
        element.start = probeTimestamp;
        document.body.appendChild(element);

        const startTimeOutput = element.shadowRoot.querySelector(
            'span.start-time'
        );

        expect(startTimeOutput).toBeTruthy();
        expect(startTimeOutput.textContent).toBe('13:00');
    });
    test('output end date', () => {
        const probeTimestamp = new Date('2000-01-01T13:00:00.0000').getTime();

        const element = createElement('ui-entry', { is: Entry });
        element.end = probeTimestamp;
        document.body.appendChild(element);

        const endDateOutput = element.shadowRoot.querySelector('span.end-date');

        expect(endDateOutput).toBeTruthy();
        expect(endDateOutput.textContent).toBe('2000-01-01');
    });

    test('output end time', () => {
        const probeTimestamp = new Date('2000-01-01T13:00:00.0000').getTime();

        const element = createElement('ui-entry', { is: Entry });
        element.end = probeTimestamp;
        document.body.appendChild(element);

        const endTimeOutput = element.shadowRoot.querySelector('span.end-time');

        expect(endTimeOutput).toBeTruthy();
        expect(endTimeOutput.textContent).toBe('13:00');
    });

    test('output comment', () => {
        const probeText = '1234abcd';

        const element = createElement('ui-entry', { is: Entry });
        element.comment = probeText;
        document.body.appendChild(element);

        const commentOutput = element.shadowRoot.querySelector('span.comment');

        expect(commentOutput).toBeTruthy();
        expect(commentOutput.textContent).toBe(probeText);
    });

    test('output initial diff calculation', () => {
        const probeStartTimestamp = new Date(
            '2000-01-01T13:00:00.0000'
        ).getTime();
        const probeEndTimestamp = new Date(
            '2000-01-01T13:30:00.0000'
        ).getTime();

        const element = createElement('ui-entry', { is: Entry });
        element.start = probeStartTimestamp;
        element.end = probeEndTimestamp;
        document.body.appendChild(element);

        const component = element.shadowRoot.querySelector('span.diff');

        expect(component).toBeTruthy();
        expect(component.textContent).toBe('0.5');
    });
});

describe('check Update of Outputs on Input change', () => {
    test('start date output changes on input change', () => {
        const probeStartTimestamp = 0;
        const newInputValue = '1900-01-01';

        const element = createElement('ui-entry', { is: Entry });
        element.start = probeStartTimestamp;
        document.body.appendChild(element);

        const modalContainer = element.shadowRoot.querySelector('ui-modal');

        const editButton = element.shadowRoot.querySelector('input.edit');
        editButton.dispatchEvent(new CustomEvent('click'));

        const input = element.shadowRoot.querySelector('input.start-date');
        input.value = newInputValue;
        modalContainer.dispatchEvent(new CustomEvent('confirm'));

        return Promise.resolve().then(() => {
            const output = element.shadowRoot.querySelector('span.start-date');
            expect(output).toBeTruthy();
            expect(output.textContent).toBe(newInputValue);
        });
    });

    test('start time output changes on input change', () => {
        const probeStartTimestamp = 0;
        const newInputValue = '14:00';

        const element = createElement('ui-entry', { is: Entry });
        element.start = probeStartTimestamp;
        document.body.appendChild(element);

        const modalContainer = element.shadowRoot.querySelector('ui-modal');

        const editButton = element.shadowRoot.querySelector('input.edit');
        editButton.dispatchEvent(new CustomEvent('click'));

        const input = element.shadowRoot.querySelector('input.start-time');
        input.value = newInputValue;
        modalContainer.dispatchEvent(new CustomEvent('confirm'));

        return Promise.resolve().then(() => {
            const output = element.shadowRoot.querySelector('span.start-time');
            expect(output).toBeTruthy();
            expect(output.textContent).toBe(newInputValue);
        });
    });

    test('end date output changes on input change', () => {
        const probeEndTimestamp = 0;
        const newInputValue = '1900-01-01';

        const element = createElement('ui-entry', { is: Entry });
        element.end = probeEndTimestamp;
        document.body.appendChild(element);

        const modalContainer = element.shadowRoot.querySelector('ui-modal');

        const editButton = element.shadowRoot.querySelector('input.edit');
        editButton.dispatchEvent(new CustomEvent('click'));

        const input = element.shadowRoot.querySelector('input.end-date');
        input.value = newInputValue;
        modalContainer.dispatchEvent(new CustomEvent('confirm'));

        return Promise.resolve().then(() => {
            const output = element.shadowRoot.querySelector('span.end-date');
            expect(output).toBeTruthy();
            expect(output.textContent).toBe(newInputValue);
        });
    });

    test('end time output changes on input change', () => {
        const probeEndTimestamp = 0;
        const newInputValue = '14:00';

        const element = createElement('ui-entry', { is: Entry });
        element.end = probeEndTimestamp;
        document.body.appendChild(element);

        const modalContainer = element.shadowRoot.querySelector('ui-modal');

        const editButton = element.shadowRoot.querySelector('input.edit');
        editButton.dispatchEvent(new CustomEvent('click'));

        const input = element.shadowRoot.querySelector('input.end-time');
        input.value = newInputValue;
        modalContainer.dispatchEvent(new CustomEvent('confirm'));

        return Promise.resolve().then(() => {
            const output = element.shadowRoot.querySelector('span.end-time');
            expect(output).toBeTruthy();
            expect(output.textContent).toBe(newInputValue);
        });
    });

    test('comment output changes on input change', () => {
        const probeComment = 'abcd';
        const newInputValue = 'a1b2c3d4';

        const element = createElement('ui-entry', { is: Entry });
        element.comment = probeComment;
        document.body.appendChild(element);

        const modalContainer = element.shadowRoot.querySelector('ui-modal');

        const editButton = element.shadowRoot.querySelector('input.edit');
        editButton.dispatchEvent(new CustomEvent('click'));

        const input = element.shadowRoot.querySelector('input.comment');
        input.value = newInputValue;
        modalContainer.dispatchEvent(new CustomEvent('confirm'));

        return Promise.resolve().then(() => {
            const output = element.shadowRoot.querySelector('span.comment');
            expect(output).toBeTruthy();
            expect(output.textContent).toBe(newInputValue);
        });
    });

    test('diff output changes on input change', () => {
        const probeStartTimestamp = 0;
        const probeEndTimestamp = 1000 * 60 * 60;
        const newInputValue = '05:00';

        const element = createElement('ui-entry', { is: Entry });
        element.start = probeStartTimestamp;
        element.end = probeEndTimestamp;
        document.body.appendChild(element);

        const modalContainer = element.shadowRoot.querySelector('ui-modal');

        const editButton = element.shadowRoot.querySelector('input.edit');
        editButton.dispatchEvent(new CustomEvent('click'));

        const input = element.shadowRoot.querySelector('input.end-time');
        input.value = newInputValue;
        modalContainer.dispatchEvent(new CustomEvent('confirm'));

        return Promise.resolve().then(() => {
            const output = element.shadowRoot.querySelector('span.diff');
            expect(output).toBeTruthy();
            expect(output.textContent).toBe('4');
        });
    });
});

describe('check events on changed values', () => {
    test('start timstamp is passed', () => {
        expect(undefined).toBeTruthy();
    });

    test('end timstamp is passed', () => {
        expect(undefined).toBeTruthy();
    });

    test('comment is passed', () => {
        expect(undefined).toBeTruthy();
    });
});
