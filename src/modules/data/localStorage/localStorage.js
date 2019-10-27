function save(obj) {
    saveKey('storage', obj);
}

function saveKey(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
}

function load() {
    return loadKey('storage');
}

function loadKey(key) {
    return JSON.parse(localStorage.getItem(key));
}

function clear() {
    clearKey('storage');
}

function clearKey(key) {
    localStorage.removeItem(key);
}

export { save, load, clear, saveKey, loadKey, clearKey };
