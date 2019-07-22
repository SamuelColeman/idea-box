class Idea {
	constructor(ideaObj) {
		this.id      = ideaObj.id;
		this.title   = ideaObj.title;
		this.body    = ideaObj.body;
		this.star    = ideaObj.star || false;
		this.quality = 0;
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

  	// updateIdeaBody(newBody) {
  	// 	this.body = newBody;
  	// }
}

//   	updateIdea(newValue) {
//   		this.title = newTitle;

//   		// globalArr.method();
//   		// this.setLocalStorage(globalArr);
//   	}


// figure out which value is being targeted
// Update specific value
// update global array with idea[index]
// set local storage
