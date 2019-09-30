import { createElement } from 'lwc';
import Storage from 'data/localStorage';

describe('interact-with-local-storage', () => {
    it('check saveing data', () => {
        const element = createElement('data-localStorage', { is: Storage });
        expect(element).toBeDefined();
    });
});
