function save(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

function load(key) {
	return JSON.parse(localStorage[key]);
}