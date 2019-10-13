import createElement from 'lwc';
import JsonCmp from 'ui/jsonCmp';

describe('check json', () => {
    test('use json as input', () => {
        const jsonInput = { value: 'test' };

        const element = createElement('ui-json-cmp', { is: JsonCmp });
        element.inputJson = jsonInput;
        document.body.appendChild(element);
    });
});
