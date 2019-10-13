import { createElement } from 'lwc';
import JsonCmp from 'ui/jsonCmp';

describe('check json', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('use json as input', () => {
        const jsonInput = { value: 'test' };

        const element = createElement('ui-json-cmp', { is: JsonCmp });
        element.inputJson = jsonInput;
        document.body.appendChild(element);

        const valueInput = element.shadowRoot.querySelector('input');
        expect(valueInput).toBeTruthy();
        expect(valueInput.value).toBe(jsonInput.value);

        const valueSpan = element.shadowRoot.querySelector('span');
        expect(valueSpan).toBeTruthy();
        expect(valueSpan.textContent).toBe(jsonInput.value);
    });

    test('span changes on input change.', () => {
        const jsonInput = { value: 'test' };
        const newValue = 'abcd';

        const element = createElement('ui-json-cmp', { is: JsonCmp });
        element.inputJson = jsonInput;
        document.body.appendChild(element);

        const valueInput = element.shadowRoot.querySelector('input');
        valueInput.value = newValue;

        return Promise.resolve().then(() => {
            const valueSpan = element.shadowRoot.querySelector('span');
            expect(valueSpan).toBeTruthy();
            expect(valueSpan.textContent).toBe(newValue);
        });
    });
});
