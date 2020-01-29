// eslint-disable-next-line no-unused-vars
import { createElement } from 'lwc';
// eslint-disable-next-line no-unused-vars
import ModalThreeSections from 'ui/modalThreeSections';

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
        const element = createElement('ui-modal-three-sections', {
            is: ModalThreeSections
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

    test('has show function', () => {
        let isVisible;
        /**
         * Given
         * The DOM contains the component
         */
        const element = createElement('ui-modal-three-sections', {
            is: ModalThreeSections
        });
        document.body.appendChild(element);

        /**
         * When
         * Calling 'show' method
         */
        element.show();
        /**
         * Then
         * The Component is Visible
         */
        isVisible = element.isVisible();
        expect(isVisible).toBe(true);
    });
});
