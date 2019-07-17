class Idea {
	constructor(title, body, id) {
		this.id = id;
		this.title = title;
		this.body = body;
		this.star = false;
		this.quality = 0;
	}


	setLocalStorage() {
		localStorage.setItem(this.id, JSON.stringify(this));
		console.log('working')
	}

	getLocalStorage() {
		JSON.parse(localStorage.getItem(this.id));
		console.log('isworking')
	}

}

