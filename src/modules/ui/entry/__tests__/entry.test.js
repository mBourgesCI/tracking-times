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

    test('component has an input for startdate', () => {
        const element = createElement('ui-entry', { is: Entry });
        document.body.appendChild(element);

        const startDateInput = element.shadowRoot.querySelector(
            'input.start-date'
        );

        expect(startDateInput).toBeTruthy();
        expect(startDateInput.hasAttribute('type')).toBeTruthy();
        expect(startDateInput.getAttribute('type')).toBe('date');
        expect(startDateInput.value).toBeDefined();
    });

    test('component has an input for start time', () => {
        const element = createElement('ui-entry', { is: Entry });
        document.body.appendChild(element);

        const startTimeInput = element.shadowRoot.querySelector(
            'input.start-time'
        );
        expect(startTimeInput).toBeTruthy();
        expect(startTimeInput.hasAttribute('type')).toBeTruthy();
        expect(startTimeInput.getAttribute('type')).toBe('time');
        expect(startTimeInput.value).toBeDefined();
    });

    test('component has an input for end date', () => {
        const element = createElement('ui-entry', { is: Entry });
        document.body.appendChild(element);

        const endDateInput = element.shadowRoot.querySelector('input.end-date');

        expect(endDateInput).toBeTruthy();
        expect(endDateInput.hasAttribute('type')).toBeTruthy();
        expect(endDateInput.getAttribute('type')).toBe('date');
        expect(endDateInput.value).toBeDefined();
    });

    test('component has an input for end time', () => {
        const element = createElement('ui-entry', { is: Entry });
        document.body.appendChild(element);

        const endTimeInput = element.shadowRoot.querySelector('input.end-time');
        expect(endTimeInput).toBeTruthy();
        expect(endTimeInput.hasAttribute('type')).toBeTruthy();
        expect(endTimeInput.getAttribute('type')).toBe('time');
        expect(endTimeInput.value).toBeDefined();
    });
});
