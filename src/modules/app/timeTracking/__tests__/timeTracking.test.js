/* eslint-disable no-unused-vars */
import { createElement } from 'lwc';
import TimeTracking from 'app/timeTracking';

describe('test core logic', () => {
    test('test adding new timestamp', () => {
        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);

        const entryListContainer = element.shadowRoot.querySelector(
            'div.entries'
        );
        expect(entryListContainer).toBeTruthy();
    });
});
