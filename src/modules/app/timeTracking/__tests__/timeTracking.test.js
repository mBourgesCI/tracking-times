/* eslint-disable no-unused-vars */
import { createElement } from 'lwc';
import { save, load, clear } from 'data/localStorage';
import TimeTracking from 'app/timeTracking';

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

            /**
             * ToDo
             * reduce test to only check whether the correct values are passed into ui-entry cmp
             */
            const outputSpans = entries[0].shadowRoot.querySelectorAll('span');
            expect(outputSpans).toBeTruthy();
            expect(outputSpans.length).toBeTruthy();
            expect(outputSpans.length).toBe(7);
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

            /**
             * ToDo
             * reduce test to only check whether the correct values are passed into ui-entry cmp
             */
            const outputSpans = entries[0].shadowRoot.querySelectorAll('span');
            expect(outputSpans).toBeTruthy();
            expect(outputSpans.length).toBeTruthy();
            expect(outputSpans.length).toBe(7);
            expect(outputSpans[0].textContent).toBe('1970-01-01');
        });
    });

    test('storage is empty from begin with', () => {
        const currentStorage = localStorage.getItem('storage');
        expect(currentStorage).toBeTruthy();
        expect(currentStorage).toBe('{}');
    });
});

describe('Add related tests', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        clearStorage();
    });

    test('Add button exists', () => {
        /**
         * Given
         * Component is Loaded
         *
         * Then
         * The Add-button exists
         *
         */

        // Given
        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);

        // Then
        const addButton = getAddButton(element.shadowRoot);
        expect(addButton).toBeTruthy();
    });

    test('Add button adds ui-entries', () => {
        /**
         * Given
         * Component is Loaded
         *
         * When
         * Clicking the Add Button three times
         *
         * Then
         * Three new entries are created
         */

        // Given
        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);

        // When
        const addButton = getAddButton(element.shadowRoot);
        addButton.dispatchEvent(new CustomEvent('click'));
        addButton.dispatchEvent(new CustomEvent('click'));
        addButton.dispatchEvent(new CustomEvent('click'));

        return Promise.resolve().then(() => {
            // Then
            const entries = element.shadowRoot.querySelectorAll('ui-entry');

            expect(entries).toBeTruthy();
            expect(entries.length).toBeTruthy();
            expect(entries.length).toBe(3);
        });
    });

    test('Save is called on Add', () => {
        /**
         * Given
         * Component is Loaded
         *
         * When
         * Clicking the Add Button
         *
         * Then
         * The new entry is saved
         */

        // Given
        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);

        // When
        const addButton = getAddButton(element.shadowRoot);
        addButton.dispatchEvent(new CustomEvent('click'));

        return Promise.resolve().then(() => {
            // Then
            expect(localStorage.getItem('storage')).toBeTruthy();
            let storage = load();
            expect(storage.entries[0]).toBeTruthy();
        });
    });
});

describe('Clear related tests', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('Clear button exists', () => {
        /**
         * Given
         * Component is Loaded
         *
         * Then
         * The Clear-button exists
         *
         */

        // Given
        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);

        // Then
        const clearButton = getClearButton(element.shadowRoot);
        expect(clearButton).toBeTruthy();
    });

    test('confirm of the clear modal resets list', () => {
        /**
         * Given
         * 1. Component is Loaded
         * 2. Has existing Entries
         *
         * When
         * Clear-Modal is confirmed
         *
         * Then
         * All entries are removed
         */

        // Given
        setCurrentVersionDummyData();
        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);

        const entriesBeforeClearing = element.shadowRoot.querySelectorAll(
            'ui-entry'
        );
        expect(entriesBeforeClearing.length).toBe(2);

        // When
        const clearingModal = element.shadowRoot.querySelector('.modal-clear');
        clearingModal.dispatchEvent(new CustomEvent('confirm'));

        //wait for confirm-click to be processed
        return Promise.resolve().then(() => {
            // Then
            const entriesAfterClearing = element.shadowRoot.querySelectorAll(
                'ui-entry'
            );
            expect(entriesAfterClearing.length).toBe(0);
        });
    });

    test('confirm of the clear modal clears storage', () => {
        /**
         * Given
         * 1. Component is Loaded
         * 2. Has existing Entries
         *
         * When
         * Clear-Modal is confirmed
         *
         * Then
         * Storage is cleared
         */

        // Given
        setCurrentVersionDummyData();
        const element = createElement('app-timeTracking', { is: TimeTracking });
        document.body.appendChild(element);

        // When
        const clearingModal = element.shadowRoot.querySelector('.modal-clear');
        clearingModal.dispatchEvent(new CustomEvent('confirm'));

        //wait for confirm-click to be processed
        return Promise.resolve().then(() => {
            // Then
            let storageString = localStorage.getItem('storage');
            expect(storageString).toBe(null);
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

function setCurrentVersionDummyData() {
    setVersion4DummyData();
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

function getAddButton(shadowRoot) {
    return getButton(shadowRoot, '.button-add');
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
