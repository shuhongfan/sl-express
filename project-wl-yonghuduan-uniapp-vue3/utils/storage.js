let storage = {

	set(key, value) {
		return localStorage.setItem(key, value);
	},
	get(key) {
		return localStorage.getItem(key);
	},
	remove(key) {
		localStorage.removeItem(key);
	}

}

export default storage;
