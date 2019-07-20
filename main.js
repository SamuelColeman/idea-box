var globalArr = JSON.parse(localStorage.getItem('ideaArr')) || [];

var ideaTitleInput = document.querySelector('.idea_title-input');
var ideaBodyInput = document.querySelector('.idea_body-input');
var ideaContainer = document.querySelector('.idea');
var box = document.querySelector('.box');
var boxCard = document.querySelector('.box_card');
var ideaSaveBtn = document.querySelector('.idea_save-btn');
var inputs = document.querySelectorAll('input');
var boxIdeaPlaceholder = document.querySelector('.box_idea-placeholder');

ideaContainer.addEventListener('click', clickSaveBtn);
box.addEventListener('click', ideaCardActions);
window.addEventListener('load', pageLoad);

function pageLoad(){
	persistedIdeas();
	reinstantiateCard();
	disableBtn();
	ideaPlaceholder();
}

function ideaPlaceholder() {
	if (globalArr.length < 1) {
		boxIdeaPlaceholder.hidden = false;
	} else {
		boxIdeaPlaceholder.hidden = true;
	}
}

function persistedIdeas(){
	for (var i = 0; i < globalArr.length; i++){
		var id = globalArr[i].id;
		var title = globalArr[i].title;
		var body = globalArr[i].body;
		var star = globalArr[i].star;
		var quality = globalArr[i].quality;
		var index = i;
		reassignClass(id,title,body,star,quality,i);
		}
	}


function reassignClass( id, title, body, star, quality, i){
	var idea = new Idea({ id : id,title : title,body : body,star : star,quality : quality });
		globalArr.splice(i,1,idea);
}


function reinstantiateCard(){
	globalArr.forEach(function(idea){
		appendNewCard(idea);
	}) 
}

for (i=0; i < inputs.length; i++) {
  	inputs[i].addEventListener('keyup', function () {
  		disableBtn();
  	})
	}

function clickSaveBtn(e) {
	e.preventDefault();
	if (e.target.classList.contains('idea_save-btn')) {
		makeNewIdea();
		ideaTitleInput.value = "";
		ideaBodyInput.value = "";
		ideaPlaceholder();
		disableBtn();
	}
}

function makeNewIdea() {
	var idea = new Idea({ id: Date.now(), title :ideaTitleInput.value, body: ideaBodyInput.value });
	globalArr.push(idea);
	appendNewCard(idea);
	idea.setLocalStorage(globalArr);
}

function ideaCardActions(e) {
	e.preventDefault();
	deleteCard(e);
	favoriteIdeaStarToggle(event);
}

	favoriteIdea(e);
	ideaPlaceholder();
	}

function deleteCard(event) {
  var cardIndex = findIndex(event);
  if (event.target.classList.contains('img_btn-exit')) {
    event.target.parentNode.parentNode.remove();
    console.log(globalArr[cardIndex]);
    globalArr[cardIndex].deleteFromStorage(cardIndex);
  }
  ideaPlaceholder();
}

function findID(event) {
  return parseInt(event.target.closest('.box_card').dataset.id);
}

function findIndex(event) {
  var id = findID(event);
  for (var i = 0; i < globalArr.length; i++) {
    if (id === globalArr[i].id) {
      return parseInt(i);
    }
  }
}

function appendNewCard(idea) {
	var star;
	if (idea.star === true) {
		star = 'images/star-active.svg';
	} else {
		star = 'images/star.svg';
	}

	box.insertAdjacentHTML('beforeend',
				`<section class="box_card" data-id=${idea.id}>
			<header class="box_card-header">
				<input class="img_btn-star box_card-icon" src="${star}" type="image">
				<input class="img_btn-exit box_card-icon" src="images/delete.svg" type="image">
			</header>
			<section class="box_card-main">
				<p class="box_card-title" contenteditable="true">${idea.title}</p>
				<p class="box_card-body" contenteditable="true">${idea.body}</p>
			</section>
			<footer class="box_card-footer">
				<input class="footer_quality-up box_card-icon" src="images/upvote.svg" type="image">
				<p class="box_card-quality">Quality:
					<span class="box_card-value">Swill
					</span>
				</p>
				<input class="footer_quality-down box_card-icon" src="images/downvote.svg" type="image">
			</footer>
		</section>`);
}

function favoriteIdeaStarToggle(event) {
	var activeStar = 'images/star-active.svg';
	var inactiveStar = 'images/star.svg';
	var cardIndex = findIndex(event);
	globalArr[cardIndex].star = !globalArr[cardIndex].star;
	if (globalArr[cardIndex].star === true) {
		event.target.src = activeStar;
		// globalArr[cardIndex].setLocalStorage(globalArr);
	} else {
		event.target.src = inactiveStar;
	}
}



function disableBtn() {
	if (ideaTitleInput.value !== "" && ideaBodyInput.value !== "") {
 			ideaSaveBtn.disabled = false;
 		} else {
 			ideaSaveBtn.disabled = true;
 	}
}
