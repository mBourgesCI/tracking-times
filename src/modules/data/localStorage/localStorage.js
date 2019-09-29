class Storage {
    save(obj) {
        localStorage.setItem('storage', JSON.stringify(obj));
    }

    load() {
        return JSON.parse(localStorage.getItem('storage'));
    }

    clear() {
        localStorage.removeItem('storage');
    }
}

export { Storage };
