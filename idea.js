class Idea {
	constructor(title, body) {
		this.id = Date.now();
		this.title = title;
		this.body = body;
		this.star = false;
		this.quality = 0;
	}
	// setLocalStorage(idea) {
	// 	var ideaToStore = ideaArr;
	// 	var stringifiedIdea = JSON.stringify(ideaToStore);
		// localStorage.setItem('storedIdea', ideaToStore);
		// localStorage.setItem(idea.id, JSON.stringify(idea));
	// }
	setLocalStorage() {
		localStorage.setItem(this.id, JSON.stringify(this));
	}

}

// module.exports = Idea;