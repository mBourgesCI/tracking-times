/* eslint-disable no-unused-vars */
import { createElement } from 'lwc';
import TimeTracking from 'app/timeTracking';

describe('test core logic', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('test entry-container exists', () => {
        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);

        const entryListContainer = element.shadowRoot.querySelector(
            'div.entries'
        );
        expect(entryListContainer).toBeTruthy();
    });
});

describe('test creation of new entries', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
});

describe('check loading based on version', () => {
    function getSaveButton(shadowRoot) {
        return getButton(shadowRoot, '.button-save');
    }

    function getAddButton(shadowRoot) {
        return getButton(shadowRoot, '.button-add');
    }

    function getLoadButton(shadowRoot) {
        return getButton(shadowRoot, '.button-load');
    }

    function getButton(shadowRoot, classname) {
        const resultList = shadowRoot.querySelectorAll(classname);
        expect(resultList).toBeTruthy();
        expect(resultList.length).toBe(1);
        return resultList[0];
    }

    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('load data without version', () => {
        const storageString = [
            {
                data:
                    '{"start":{"value":0},"end":{"value":1000},"comment":"legacy entry","id":0}',
                index: 0
            },
            {
                data:
                    '{"start":{"value":0},"end":{"value":1000},"comment":"legacy entry","id":1}',
                index: 1
            }
        ];
        localStorage.setItem('storage', JSON.stringify(storageString));

        const element = createElement('app-timeTracking', { is: TimeTracking });

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const entries = element.shadowRoot.querySelectorAll('ui-entry');
            expect(entries).toBeTruthy();
            expect(entries.length).toBeTruthy();
            expect(entries.length).toBe(2);

            // penetrate the component boundary
            //
            // not a best practice but necessary for
            // make sure nothing breakes on a fast way

            const outputSpans = entries[0].shadowRoot.querySelectorAll('span');
            expect(outputSpans).toBeTruthy();
            expect(outputSpans.length).toBeTruthy();
            expect(outputSpans.length).toBe(6);
            expect(outputSpans[0].classList[0]).toBe('start-date');
            expect(outputSpans[0].textContent).toBe('1970-01-01');

            expect(outputSpans[1].classList[0]).toBe('start-time');
            expect(outputSpans[1].textContent).toBe('00:00');

            expect(outputSpans[2].classList[0]).toBe('end-date');
            expect(outputSpans[2].textContent).toBe('1970-01-01');

            expect(outputSpans[3].classList[0]).toBe('end-time');
            expect(outputSpans[3].textContent).toBe('00:03');

            expect(outputSpans[4].classList[0]).toBe('diff');
            expect(outputSpans[4].textContent).toBe('0.05');

            expect(outputSpans[5].classList[0]).toBe('comment');
            expect(outputSpans[5].textContent).toBe('legacy entry');
        });
    });

    test('load data of version 0.3', () => {
        const data = {
            'settings': {
                version: 'v0.3'
            },
            'time-entries': [
                {
                    comment: 'entry1',
                    start: 0,
                    end: 1000
                },
                {
                    comment: 'entry2',
                    start: 0,
                    end: 1800000
                }
            ]
        };

        localStorage.setItem('tracking-times', JSON.stringify(data));

        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);
    });
});
