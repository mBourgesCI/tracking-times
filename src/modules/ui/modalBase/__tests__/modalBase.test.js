// eslint-disable-next-line no-unused-vars
import { createElement } from 'lwc';
// eslint-disable-next-line no-unused-vars
import ModalBase from 'ui/modalBase';

describe('Control visibility', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('check isVisible', () => {
        const element = createElement('ui-modal-base', { is: ModalBase });
        document.body.appendChild(element);
    });
});
