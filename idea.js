class Idea {
	constructor(ideaObj) {
		this.id = ideaObj.id;
		this.title = ideaObj.title;
		this.body = ideaObj.body;
		this.star = false;
		this.quality = 0;
	}

	setLocalStorage(array) {
		localStorage.setItem('ideaArr', JSON.stringify(array));
	}


	 deleteFromStorage(cardIndex) {
    globalArr.splice(cardIndex, 1);
    this.setLocalStorage(globalArr);
  }



}

