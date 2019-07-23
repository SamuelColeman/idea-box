var globalArr          = JSON.parse(localStorage.getItem('ideaArr')) || [];
var box                = document.querySelector('.box');
var boxCardHeader      = document.querySelector('.box_card-header');
var boxIdeaPlaceholder = document.querySelector('.box_idea-placeholder');
var ideaBodyInput      = document.querySelector('.idea_body-input');
var ideaContainer      = document.querySelector('.idea');
var ideaSaveBtn        = document.querySelector('.idea_save-btn');
var ideaTitleInput     = document.querySelector('.idea_title-input');
var inputs             = document.querySelectorAll('input');
var ideaSearchInput		 = document.querySelector('.idea_search-input');


box.addEventListener('click', ideaCardActions);
box.addEventListener('keydown', isEnterKey);
if (boxCardHeader) {
	boxCardHeader.addEventListener('click', favoriteIdeaStarToggle);	
}
ideaContainer.addEventListener('click', clickSaveBtn);
window.addEventListener('load', pageLoad);
ideaSearchInput.addEventListener('keyup', filterSearch);

function pageLoad(){
	persistedIdeas();
	reinstantiateCard();
	disableBtn();
	ideaPlaceholder();
}

// var boxCard = document.querySelector('.box_card');
var assignUp =  document.querySelector('.footer_quality-up');
var assignDown =  document.querySelector('.footer_quality-down');

box.addEventListener('click', increaseQuality);
box.addEventListener('click', decreaseQuality);

function increaseQuality(event) {
    var cardIndex = findIndex(event);
    var assignUp = event.target.closest('.footer_quality-up');

    if (event.target === assignUp) {
        var currentQuality = globalArr[cardIndex].quality;
         if (currentQuality < 2) {
  console.log('hi')
         	currentQuality++;
         	globalArr[cardIndex].quality = currentQuality;
         	globalArr[cardIndex].setLocalStorage();
         }
    }
    displayQuality(event, cardIndex);
}

function decreaseQuality(event) {
    var cardIndex = findIndex(event);
    var assignDown = event.target.closest('.footer_quality-down');
 if (event.target === assignDown) {
        var currentQuality = globalArr[cardIndex].quality;
         if (currentQuality > 0) {
         	currentQuality--;
         	globalArr[cardIndex].quality = currentQuality;
         	globalArr[cardIndex].setLocalStorage();
         }
       }
       displayQuality(event, cardIndex);
}

function displayQuality(event, cardIndex) {
	var currentQuality = globalArr[cardIndex].quality;
	var qualityName = globalArr[cardIndex].qualities[currentQuality];
	event.target.closest('footer').querySelector('.box_card-value').innerText = qualityName;
}


function ideaCardActions(event) {
	event.preventDefault();
	deleteCard(event);
	favoriteIdeaStarToggle(event);
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
		var id      = globalArr[i].id;
		var title   = globalArr[i].title;
		var body    = globalArr[i].body;
		var star    = globalArr[i].star;
		var quality = globalArr[i].quality;
		var index   = i;
		reassignClass(id,title,body,star,quality,i);
	}
}

function reassignClass(id, title, body, star, quality, i){
	var idea = new Idea({
		id:      id,
		title:   title,
		body:    body,
		star:    star,
		quality: quality 
	});
		globalArr.splice(i, 1, idea);
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

function clickSaveBtn(event) {
	event.preventDefault();
	if (event.target.classList.contains('idea_save-btn')) {
		makeNewIdea();
		ideaTitleInput.value = "";
		ideaBodyInput.value = "";
		ideaPlaceholder();
		disableBtn();
	}
}

function makeNewIdea() {
	var idea = new Idea({ 
		id:    Date.now(), 
		title: ideaTitleInput.value, 
		body:  ideaBodyInput.value 
	});
	globalArr.push(idea);
	appendNewCard(idea);
	idea.setLocalStorage(globalArr);
}


function deleteCard(event) {
  var cardIndex = findIndex(event);
  if (event.target.classList.contains('img_btn-exit')) {
    event.target.parentNode.parentNode.remove();
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
	if (idea.star) {
		star = 'images/star-active.svg';
	} else {
		star = 'images/star.svg';
	}
	var quality = idea.qualities[idea.quality];
	
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
					<span class="box_card-value">${quality}
					</span>
				</p>
				<input class="footer_quality-down box_card-icon" src="images/downvote.svg" type="image">
			</footer>
		</section>`);
}

function favoriteIdeaStarToggle(event) {
	var activeStar   = 'images/star-active.svg';
	var inactiveStar = 'images/star.svg';
	var cardIndex    = findIndex(event);
	if (event.target.closest('.img_btn-star')){
		globalArr[cardIndex].star = !globalArr[cardIndex].star;
		if (globalArr[cardIndex].star) {
			event.target.src = activeStar;
		} else {
			event.target.src = inactiveStar;
		}	
		globalArr[cardIndex].setLocalStorage(globalArr);
	}
}

function disableBtn() {
	if (ideaTitleInput.value !== "" && ideaBodyInput.value !== "") {
 			ideaSaveBtn.disabled = false;
 		} else {
 			ideaSaveBtn.disabled = true;
 	}
}

function isEnterKey(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		if (event.target.closest('.box_card-title')) {
			saveEditedTitle(event);
		} else if (event.target.closest('.box_card-body')) {
			saveEditedBody(event);
		}
	}
}
// save edited title or something
function saveEditedTitle (event) {
	var cardIndex = findIndex(event);
	var editedIdeaTitle = event.target.closest('.box_card-title').innerText;
	globalArr[cardIndex].updateIdeaTitle(editedIdeaTitle);
		console.log(globalArr[cardIndex]);
}

function saveEditedBody (event) {
	var cardIndex = findIndex(event);
	var editedIdeaBody = event.target.closest('.box_card-body').innerText;
	globalArr[cardIndex].updateIdeaBody(editedIdeaBody);
		console.log(globalArr[cardIndex]);
}

// ADD STAR TO ON ENTER KEY THING
// One event listener
// If body updated,
// 	Update body value with new body value
// If title updated
// 	Update title value with new title value
// Update idea in the array
// Update array in local storage

function filterSearch() {
	var searchStr = ideaSearchInput.value.toUpperCase();
	var newArr = globalArr.filter(function(search){
	return (search.title.toUpperCase().includes(searchStr) || search.body.toUpperCase().includes(searchStr));
	})
		box.innerHTML = '';
		newArr.map(function(search) {
			appendNewCard(search);
	});
}
// Rename favoriteIdeaStarToggle to header something
// boxCardHeader should invoke deleteCard() and favoriteIdeaStarToggle(event)

// GET THIS vvv TO WORK
// function ideaHeaderActions(event) {
// 	event.preventDefault();
// 	deleteCard(event);
// 	favoriteIdeaStarToggle(event);
// }