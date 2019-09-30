import { save, load, clear } from 'data/localStorage';

describe('check interacting with local storage', () => {
    const objectToSave = { var: 5 };

    test('test saving', () => {
        save(objectToSave);

        let storageValue = JSON.parse(localStorage.getItem('storage'));
        expect(storageValue).toBeTruthy();
        expect(storageValue.var).toBeTruthy();
        expect(storageValue.var).toBe(5);
    });

    test('test loading', () => {
        localStorage.setItem('storage', JSON.stringify(objectToSave));

        let loadedObject = load();

        expect(loadedObject).toBeTruthy();
        expect(loadedObject.var).toBeTruthy();
        expect(loadedObject.var).toBe(5);
    });

    test('test clearing', () => {
        localStorage.setItem('storage', JSON.stringify(objectToSave));

        clear();

        let storageValue = JSON.parse(localStorage.getItem('storage'));
        expect(storageValue).toBeFalsy();
    });
});
