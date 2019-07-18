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
		console.log('working')
	}

// 	deleteFromStorage(array) {
// 		console.log(targId)
// 		for (i=0; i<array.length; i++) {
// 		if (targId === array[i].id) {
// 			console.log(array[i].id)
// 			localStorage.removeItem(array[i]);
// 		}
// 	}
// }

}

