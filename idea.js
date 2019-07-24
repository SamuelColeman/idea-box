class Idea {
	constructor(ideaObj) {
		this.id      = ideaObj.id;
		this.title   = ideaObj.title;
		this.body    = ideaObj.body;
		this.star    = ideaObj.star || false;
		this.qualities = ["Swill", "Plausible", "Genius"];
    this.quality = ideaObj.quality || 0;
	}

	setLocalStorage() {
		localStorage.setItem('ideaArr', JSON.stringify(globalArr));
	}

	deleteFromStorage(cardIndex) {
    	globalArr.splice(cardIndex, 1);
    	this.setLocalStorage();
  	}

  updateIdeaTitle(newTitle) {
      this.title = newTitle;
  		this.setLocalStorage(globalArr);
  		console.log(globalArr);
  	}

  updateIdeaBody(newBody) {
  		this.body = newBody;
  		this.setLocalStorage(globalArr);
  		console.log(globalArr);
  	}
}