function save(obj) {
    localStorage.setItem('storage', JSON.stringify(obj));
}

function load() {
    return JSON.parse(localStorage.getItem('storage'));
}

function clear() {
    localStorage.removeItem('storage');
}

export { save, load, clear };
