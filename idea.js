class Idea {
	constructor(title, body) {
		this.id = Date.now();
		this.title = title;
		this.body = body;
		this.star = false;
		this.quality = 0;
	}
	// setLocalStorage() {
	// 	var ideaToStore = ideaArr;
	// 	var stringifiedIdea = JSON.stringify(ideaToStore);
		// localStorage.setItem('storedIdea', ideaToStore);
	// }
	setLocalStorage(ideaObj) {
		localStorage.setItem('storedIdea', JSON.stringify(ideaObj));
	}

}

// module.exports = Idea;