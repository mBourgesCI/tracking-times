import { createElement } from 'lwc';
import FileDownload from 'data/fileDownload';

describe('download button', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('exists', () => {
        /**
         * Given
         * -
         */

        /**
         * When
         * The component is added to the document without any attributes
         */
        const element = createElement('data-file-download', {
            is: FileDownload
        });
        document.body.appendChild(element);

        /**
         * Then
         * A Download button exits
         */
        const downloadBtn = element.shadowRoot.querySelector('.btn-download');
        expect(downloadBtn).toBeTruthy();
    });
});

describe('Attributes', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('filename', () => {
        /**
         * Given
         * -
         */

        /**
         * When
         * The component is added to the document with filename attribute
         */
        const testValue = 'a1b2c3';
        const element = createElement('data-file-download', {
            is: FileDownload
        });
        element.filename = testValue;
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            /**
             * Then
             * Given value is passed to the cmp and available
             */
            const testElem = document.body.querySelector('data-file-download');
            expect(testElem).toBeTruthy();
            expect(testElem.filename).toBe(testValue);
        });
    });
});
