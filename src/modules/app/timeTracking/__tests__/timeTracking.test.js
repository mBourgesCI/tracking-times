/* eslint-disable no-unused-vars */
import { createElement } from 'lwc';
import TimeTracking from 'app/timeTracking';
/*
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
*/
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
        });
    });
});
