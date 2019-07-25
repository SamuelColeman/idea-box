var globalArr          = JSON.parse(localStorage.getItem('ideaArr')) || [];
var assignDown 	       = document.querySelector('.footer_quality-down');
var assignUp	          = document.querySelector('.footer_quality-up');
var box                = document.querySelector('.box');
var boxCardHeader      = document.querySelector('.box_card-header');
var boxCardFooter      = document.querySelector('.box_card-footer');
var boxIdeaPlaceholder = document.querySelector('.box_idea-placeholder');
var ideaBodyInput      = document.querySelector('.idea_body-input');
var ideaContainer      = document.querySelector('.idea');
var ideaSaveBtn        = document.querySelector('.idea_save-btn');
var ideaTitleInput     = document.querySelector('.idea_title-input');
var inputs             = document.querySelectorAll('textarea');
var ideaSearchInput    = document.querySelector('.idea_search-input');

box.addEventListener('click', boxEventHandler);
box.addEventListener('keydown', isEnterKey);
ideaContainer.addEventListener('click', clickSaveBtn);
ideaSearchInput.addEventListener('keyup', filterSearch);
window.addEventListener('load', pageLoad);

function pageLoad(){
	persistedIdeas();
	reinstantiateCard();
	disableBtn();
	ideaPlaceholder();
  hamburger();
}

function boxEventHandler(event) {
  event.preventDefault();
  ideaPlaceholder();
  if (event.target.closest('.footer_quality-up')) {
    increaseQuality(event);
  }
  if (event.target.closest('.footer_quality-down')) {
    decreaseQuality(event);
  }
  if (event.target.closest('.img_btn-star')) {
    favoriteIdeaStarToggle(event);
  }
  if (event.target.classList.contains('img_btn-exit')) {
    deleteCard(event);
  }
}

function ideaPlaceholder() {
  if (globalArr.length < 1) {
    boxIdeaPlaceholder.hidden = false;
  } else {
    boxIdeaPlaceholder.hidden = true;
  };
};

function persistedIdeas(){
  for (var i = 0; i < globalArr.length; i++){
    var id      = globalArr[i].id;
    var title   = globalArr[i].title;
    var body    = globalArr[i].body;
    var star    = globalArr[i].star;
    var quality = globalArr[i].quality;
    var index   = i;
    reassignClass(id,title,body,star,quality,i);
  };
};

function reassignClass(id, title, body, star, quality, i){
  var idea = new Idea({
    id:      id,
    title:   title,
    body:    body,
    star:    star,
    quality: quality 
  });
  globalArr.splice(i, 1, idea);
};

function reinstantiateCard(){
  globalArr.forEach(function(idea){
    appendNewCard(idea);
  }); 
};

for (i=0; i < inputs.length; i++) {
  inputs[i].addEventListener('keyup', function () {
    disableBtn();
  });
};

function clickSaveBtn(event) {
  event.preventDefault();
  if (event.target.classList.contains('idea_save-btn')) {
    makeNewIdea();
    ideaTitleInput.value = "";
    ideaBodyInput.value = "";
    ideaPlaceholder();
    disableBtn();
  };
};

function makeNewIdea() {
  var idea = new Idea({ 
    id:    Date.now(), 
    title: ideaTitleInput.value, 
    body:  ideaBodyInput.value 
  });
  globalArr.push(idea);
  appendNewCard(idea);
  idea.setLocalStorage(globalArr);
};

function filterSearch() {
  var searchStr = ideaSearchInput.value.toUpperCase();
  var newArr = globalArr.filter(function(search){
  return (search.title.toUpperCase().includes(searchStr) || 
    search.body.toUpperCase().includes(searchStr));
  });
    box.innerHTML = '';
    newArr.map(function(search) {
    appendNewCard(search);
  });
};

function deleteCard(event) {
  var cardIndex = findIndex(event);
  if (event.target.classList.contains('img_btn-exit')) {
    event.target.parentNode.parentNode.remove();
    globalArr[cardIndex].deleteFromStorage(cardIndex);
  };
  ideaPlaceholder();
};

function findID(event) {
  return parseInt(event.target.closest('.box_card').dataset.id);
};

function findIndex(event) {
  var id = findID(event);
  for (var i = 0; i < globalArr.length; i++) {
    if (id === globalArr[i].id) {
      return parseInt(i);
    };
  };
};

function appendNewCard(idea) {
  var star;
  if (idea.star) {
    star = 'images/star-active.svg';
  } else {
    star = 'images/star.svg';
  };
  var quality = idea.qualities[idea.quality];
	
    box.insertAdjacentHTML('afterbegin',
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
};

function favoriteIdeaStarToggle(event) {
  var activeStar   = 'images/star-active.svg';
  var inactiveStar = 'images/star.svg';
  var cardIndex    = findIndex(event);
  globalArr[cardIndex].star = !globalArr[cardIndex].star;
  if (globalArr[cardIndex].star) {
    event.target.src = activeStar;
  } else {
    event.target.src = inactiveStar;
  };
  globalArr[cardIndex].setLocalStorage(globalArr);
};

function isEnterKey(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    var title = event.target.closest('section').querySelector('.box_card-title').innerText;
    var body = event.target.closest('section').querySelector('.box_card-body').innerText;
    saveEditedText(event, title, body);
  };
};

function saveEditedText(event, title, body) {
  var cardIndex = findIndex(event);
  globalArr[cardIndex].updateIdeaTitle(title);
  globalArr[cardIndex].updateIdeaBody(body);
}

function increaseQuality(event) {
  var cardIndex = findIndex(event);
  var currentQuality = globalArr[cardIndex].quality;
  if (currentQuality < 2) {
    currentQuality++;
    globalArr[cardIndex].quality = currentQuality;
    globalArr[cardIndex].setLocalStorage();
    };
    displayQuality(event, cardIndex);
};

function decreaseQuality(event) {
  var cardIndex = findIndex(event);
  var currentQuality = globalArr[cardIndex].quality;
  if (currentQuality > 0) {
    currentQuality--;
    globalArr[cardIndex].quality = currentQuality;
    globalArr[cardIndex].setLocalStorage();
    };
    displayQuality(event, cardIndex);
};


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

function hamburger() {
navBar_hamburger-menu.insertAdjacentHTML('afterbegin',`
  <button type="image" class="hamburger_btn hidden"> <img class="hamburger_btn-img" src= "images/menu.svg" alt = "hamburger menu"/> 
      </button>
      <header class="navBar_header">IdeaBox Redux
      </header>
  <div class="navBar_border"></div>
      <section class="navBar_star">
        <p class="navBar_star-title">Filter Starred Ideas</p>
        <button class="navBar_star-button" type="button">Show Starred Ideas</button>
      </section>
      <div class="navBar_border"></div>
      <section class="quality">
        <p class="quality_title">Filter by Quality</p>
        <button class="quality_swill-btn" type="button">Swill</button>
        <button class="quality_plausible-btn" type="button">Plausible</button>
        <button class="quality_genius-btn" type="button">Genius</button>
        <form class="quality_form">
          <p class="quality_new-title">New Quality</p>
          <input class="quality_new-input" type="text">
          <button class="quality_new-btn" type="button">Add New Quality</button>
        </form>
      </section>
      <div class="navBar_border"></div>`)
};
// Rename favoriteIdeaStarToggle to header something
// boxCardHeader should invoke deleteCard() and favoriteIdeaStarToggle(event)

function displayQuality(event, cardIndex) {
  var currentQuality = globalArr[cardIndex].quality;
  var qualityName = globalArr[cardIndex].qualities[currentQuality];
  event.target.closest('footer').querySelector('.box_card-value').innerText = qualityName;
};

function disableBtn() {
  if (ideaTitleInput.value !== "" &&
    ideaBodyInput.value !== "") {
    ideaSaveBtn.disabled = false;
    ideaSaveBtn.classList.remove('disabled')
  } else {
    ideaSaveBtn.disabled = true;
    ideaSaveBtn.classList.add('disabled')
  };
};
