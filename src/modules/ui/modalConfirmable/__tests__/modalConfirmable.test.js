/* eslint-disable no-unused-vars */

import { createElement } from 'lwc';
import ModalConfirmable from 'ui/modalConfirmable';

describe('visibility controls', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('has isVisible method', () => {
        let isVisible;
        /**
         * Given
         * The component is added to Dom
         */
        const element = createElement('ui-modal-confirmable', {
            is: ModalConfirmable
        });
        document.body.appendChild(element);

        /**
         * When
         * Calling 'isVisible' method
         */
        isVisible = element.isVisible();

        /**
         * Then
         * returns false by default
         */
        expect(isVisible).toBe(false);
    });
});
