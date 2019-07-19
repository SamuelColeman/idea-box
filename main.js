var globalArr = JSON.parse(localStorage.getItem('ideaArr')) || [];

var ideaTitleInput = document.querySelector('.idea_title-input');
var ideaBodyInput = document.querySelector('.idea_body-input');
var ideaContainer = document.querySelector('.idea');
var box = document.querySelector('.box');
var boxCard = document.querySelector('.box-card');

ideaContainer.addEventListener('click', clickSaveBtn);
box.addEventListener('click', ideaCardActions);
window.addEventListener('load', pageLoad);

function pageLoad(){
	persistedIdeas();
	reinstantiateCard();
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


function clickSaveBtn(e) {
	e.preventDefault();
	if (e.target.classList.contains('idea_save-btn')) {
		makeNewIdea();
		ideaTitleInput.value = "";
		ideaBodyInput.value = "";
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
	favoriteIdea(e);
}

// function deleteCard(event) {
// 	if (event.target.classList.contains('img_btn-exit')) {
// 		event.target.parentNode.parentNode.remove();
// 	}
// }


function deleteCard(event) {
  var cardIndex = findIndex(event);
  if (event.target.classList.contains('img_btn-exit')) {
    event.target.parentNode.parentNode.remove();
    console.log(globalArr[cardIndex]);
    globalArr[cardIndex].deleteFromStorage(cardIndex);
  }
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
	box.insertAdjacentHTML('afterbegin',
				`<section class="box_card" data-id=${idea.id}>
			<header class="box_card-header">
				<input class="img_btn-star box_card-icon" src="images/star.svg" type="image">
				<input class="img_btn-starActive box_card-icon hidden" src="images/star-active.svg" type="image">
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

function favoriteIdea(e) {
	var favoritedIdea = document.querySelector('.img_btn-starActive');
	var inactiveStar = document.querySelector('.img_btn-star');
	if (e.target.classList.contains('img_btn-star')) {
		favoritedIdea.classList.remove('hidden');
		inactiveStar.classList.add('hidden');
	} else {
		favoritedIdea.classList.add('hidden');
		inactiveStar.classList.remove('hidden');
	}
}