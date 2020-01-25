/* eslint-disable no-unused-vars */
import { createElement } from 'lwc';
import TimeTracking from 'app/timeTracking';

describe('test core logic', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        clearStorage();
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
/*
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
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        clearStorage();
    });

    test('load data without version', () => {
        const storageString = [
            {
                data:
                    '{"start":{"value":0},"end":{"value":180000},"comment":"legacy entry","id":0}',
                index: 0
            }
        ];
        localStorage.setItem('storage', JSON.stringify(storageString));

        const element = createElement('app-timeTracking', { is: TimeTracking });

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const entries = element.shadowRoot.querySelectorAll('ui-entry');
            expect(entries).toBeTruthy();
            expect(entries.length).toBeTruthy();
            expect(entries.length).toBe(1);

            // penetrate the component boundary
            //
            // not a best practice but necessary/fast for
            // make sure nothing breakes

            const outputSpans = entries[0].shadowRoot.querySelectorAll('span');
            expect(outputSpans).toBeTruthy();
            expect(outputSpans.length).toBeTruthy();
            expect(outputSpans.length).toBe(6);
            expect(outputSpans[0].classList[0]).toBe('start-date');
            expect(outputSpans[0].textContent).toBe('1970-01-01');

            expect(outputSpans[1].classList[0]).toBe('start-time');
            expect(outputSpans[1].textContent).toBe('01:00');

            expect(outputSpans[2].classList[0]).toBe('end-date');
            expect(outputSpans[2].textContent).toBe('1970-01-01');

            expect(outputSpans[3].classList[0]).toBe('end-time');
            expect(outputSpans[3].textContent).toBe('01:03');

            expect(outputSpans[4].classList[0]).toBe('diff');
            expect(outputSpans[4].textContent).toBe('0.05');

            expect(outputSpans[5].classList[0]).toBe('comment');
            expect(outputSpans[5].textContent).toBe('legacy entry');
        });
    });

    test('load data of version 0.3', () => {
        setVersion3DummyData();

        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const entries = element.shadowRoot.querySelectorAll('ui-entry');
            expect(entries).toBeTruthy();
            expect(entries.length).toBeTruthy();
            expect(entries.length).toBe(2);

            // penetrate component border

            const outputSpans = entries[0].shadowRoot.querySelectorAll('span');
            expect(outputSpans).toBeTruthy();
            expect(outputSpans.length).toBeTruthy();
            expect(outputSpans.length).toBe(6);
            expect(outputSpans[0].textContent).toBe('1970-01-01');
        });
    });

    test('storage is empty from begin with', () => {
        const currentStorage = localStorage.getItem('storage');
        expect(currentStorage).toBeTruthy();
        expect(currentStorage).toBe('{}');
    });
});

describe('check buttons exist', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        clearStorage();
    });

    test('Add button exists', () => {
        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);

        const addButton = getAddButton(element.shadowRoot);
        expect(addButton).toBeTruthy();
    });

    test('Save button exists', () => {
        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);

        const saveButton = getSaveButton(element.shadowRoot);
        expect(saveButton).toBeTruthy();
    });

    test('Load button exists', () => {
        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);

        const loadButton = getLoadButton(element.shadowRoot);
        expect(loadButton).toBeTruthy();
    });

    test('Clear button exists', () => {
        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);

        const clearButton = getClearButton(element.shadowRoot);
        expect(clearButton).toBeTruthy();
    });
});

describe('check buttons', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        clearStorage();
    });

    test('Add button exists and adds ui-entries', () => {
        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);

        const addButton = getAddButton(element.shadowRoot);
        expect(addButton).toBeTruthy();
        addButton.dispatchEvent(new CustomEvent('click'));
        addButton.dispatchEvent(new CustomEvent('click'));
        addButton.dispatchEvent(new CustomEvent('click'));

        return Promise.resolve().then(() => {
            const entries = element.shadowRoot.querySelectorAll('ui-entry');

            expect(entries).toBeTruthy();
            expect(entries.length).toBeTruthy();
            expect(entries.length).toBe(3);
        });
    });

    test('Save button exists and saves data to local storage', () => {
        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);

        const addButton = getAddButton(element.shadowRoot);
        expect(addButton).toBeTruthy();
        addButton.dispatchEvent(new CustomEvent('click'));
        addButton.dispatchEvent(new CustomEvent('click'));
        addButton.dispatchEvent(new CustomEvent('click'));

        const currentStorage = localStorage.getItem('storage');
        expect(currentStorage).toBeTruthy();
        expect(currentStorage).toBe('{}');
        const saveButton = getSaveButton(element.shadowRoot);
        saveButton.dispatchEvent(new CustomEvent('click'));

        return Promise.resolve().then(() => {
            const loadedString = localStorage.getItem('storage');
            const loadedData = JSON.parse(loadedString);
            expect(loadedData).toBeTruthy();
            expect(loadedData.settings).toBeTruthy();
            expect(loadedData.entries).toBeTruthy();
            expect(loadedData.entries.length).toBe(3);
            expect(loadedData.entries[0].start).toBeTruthy();
            expect(loadedData.entries[0].end).toBeTruthy();
            expect(loadedData.entries[1].start).toBeTruthy();
            expect(loadedData.entries[1].end).toBeTruthy();
            expect(loadedData.entries[2].start).toBeTruthy();
            expect(loadedData.entries[2].end).toBeTruthy();
        });
    });

    test('Load button exists', () => {
        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);

        const loadButton = getLoadButton(element.shadowRoot);
        expect(loadButton).toBeTruthy();
    });

    test('Load button clears unsaved entry list', () => {
        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);

        const addButton = getLoadButton(element.shadowRoot);
        addButton.dispatchEvent(new CustomEvent('click'));
        addButton.dispatchEvent(new CustomEvent('click'));
        // adds to entries to list proven by 'add'-tests

        const loadButton = getLoadButton(element.shadowRoot);
        expect(loadButton).toBeTruthy();
        loadButton.dispatchEvent(new CustomEvent('click'));

        return Promise.resolve().then(() => {
            const entries = element.shadowRoot.querySelectorAll('ui-entry');
            expect(entries).toBeTruthy();
            expect(entries.length).toBe(0);
        });
    });

    test('Load button reloads from last saved state', () => {
        setVersion4DummyData();

        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);

        const addButton = getAddButton(element.shadowRoot);
        // adds to entries to list proven by 'add'-tests
        addButton.dispatchEvent(new CustomEvent('click'));
        addButton.dispatchEvent(new CustomEvent('click'));

        return Promise.resolve().then(() => {
            const entriesBeforeReload = element.shadowRoot.querySelectorAll(
                'ui-entry'
            );
            expect(entriesBeforeReload.length).toBe(4);

            //click load button to return to saved state
            const loadButton = getLoadButton(element.shadowRoot);
            loadButton.dispatchEvent(new CustomEvent('click'));
            return Promise.resolve().then(() => {
                const entriesAfterReload = element.shadowRoot.querySelectorAll(
                    'ui-entry'
                );
                expect(entriesAfterReload.length).toBe(2);
            });
        });
    });

    test('confirm of the clear modal resets list and storage.', () => {
        setVersion4DummyData();

        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);

        const entriesBeforeClearing = element.shadowRoot.querySelectorAll(
            'ui-entry'
        );
        expect(entriesBeforeClearing.length).toBe(2);

        const clearingModal = element.shadowRoot.querySelector('.modal-clear');

        clearingModal.dispatchEvent(new CustomEvent('confirm'));

        //wait for confirm-click to be processed
        return Promise.resolve().then(() => {
            // check entry list
            const entriesAfterClearing = element.shadowRoot.querySelectorAll(
                'ui-entry'
            );
            expect(entriesAfterClearing.length).toBe(0);

            // check storage
            let storageStr = localStorage.getItem('storage');
            // the whole 'storage key got removed'
            expect(storageStr).toBe(null);
        });
    });
});

describe('check delete', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        clearStorage();
    });

    test('check delete', () => {
        /**
         * Given
         * Four entries
         *
         * When
         * Recieving delete-event of third entry
         *
         * Then
         * 1. third entry is removed.
         * 2. 1st, 2nd, 4th entry remain in list
         */
        const indexAttributeName = 'data-index';

        // Given
        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);

        const addButton = getAddButton(element.shadowRoot);
        addButton.dispatchEvent(new CustomEvent('click'));
        addButton.dispatchEvent(new CustomEvent('click'));
        addButton.dispatchEvent(new CustomEvent('click'));
        addButton.dispatchEvent(new CustomEvent('click'));

        return Promise.resolve().then(() => {
            const entriesOriginal = element.shadowRoot.querySelectorAll(
                'ui-entry'
            );
            expect(entriesOriginal.length).toBe(4);

            // add comment for identifying entries
            for (let index = 0; index < entriesOriginal.length; index++) {
                const entryOriginal = entriesOriginal[index];
                entryOriginal.comment = 'entry ' + index;
            }

            // When
            let thirdEntry = entriesOriginal[2];
            thirdEntry.dispatchEvent(new CustomEvent('delete'));

            // Then
            return Promise.resolve().then(() => {
                // get list of new entries
                const entriesResult = element.shadowRoot.querySelectorAll(
                    'ui-entry'
                );

                // check one Entry was removed
                expect(entriesResult.length).toBe(3);
                expect(entriesResult[0].comment).toBe(
                    entriesOriginal[0].comment
                );
                expect(entriesResult[1].comment).toBe(
                    entriesOriginal[1].comment
                );
                // entriesOriginal[2] is missing now
                expect(entriesResult[2].comment).toBe(
                    entriesOriginal[3].comment
                );
            });
        });
    });
});

function clearStorage() {
    localStorage.setItem('storage', JSON.stringify({}));
}

function setVersion3DummyData() {
    const data = {
        settings: {
            version: 'v0.3'
        },
        entries: [
            {
                sortnumber: 0,
                comment: 'entry1',
                start: 0,
                end: 1000
            },
            {
                sortnumber: 1,
                comment: 'entry2',
                start: 0,
                end: 1800000
            }
        ]
    };

    localStorage.setItem('storage', JSON.stringify(data));
}

function setVersion4DummyData() {
    const data = {
        settings: {
            version: 'v0.4'
        },
        entries: [
            {
                itemId: 0,
                sortnumber: 0,
                comment: 'entry1',
                start: 0,
                end: 1000
            },
            {
                itemId: 1,
                sortnumber: 1,
                comment: 'entry2',
                start: 50,
                end: 1800000
            }
        ]
    };

    localStorage.setItem('storage', JSON.stringify(data));
}

function getSaveButton(shadowRoot) {
    return getButton(shadowRoot, '.button-save');
}

function getAddButton(shadowRoot) {
    return getButton(shadowRoot, '.button-add');
}

function getLoadButton(shadowRoot) {
    return getButton(shadowRoot, '.button-load');
}

function getClearButton(shadowRoot) {
    return getButton(shadowRoot, '.button-clear');
}

function getButton(shadowRoot, classname) {
    const resultList = shadowRoot.querySelectorAll(classname);
    expect(resultList).toBeTruthy();
    expect(resultList.length).toBe(1);
    return resultList[0];
}
