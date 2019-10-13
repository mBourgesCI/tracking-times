import createElement from 'lwc';
import JsonCmp from 'ui/jsonCmp';

describe('check json', () => {
    test('use json as input', () => {
        const element = createElement('ui-json-cmp', { is: JsonCmp });
        document.body.appendChild(element);
    });
});
