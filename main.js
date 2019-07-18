var globalArr = JSON.parse(localStorage.getItem('ideaArr')) || [];

var ideaTitleInput = document.querySelector('.idea_title-input');
var ideaBodyInput = document.querySelector('.idea_body-input');
var ideaContainer = document.querySelector('.idea');
var box = document.querySelector('.box');
var boxCard = document.querySelector('.box-card');

ideaContainer.addEventListener('click', targetSaveBtn);
box.addEventListener('click', ideaCardActions);

// function disableBtn() {
// 	var ideaSaveBtn = document.querySelector('.idea_save-btn')
// 	if (ideaTitleInput.value === '' || ideaBodyInput.value === '') {
// 		ideaSaveBtn.disabled = true;
// 	} else {
// 		ideaSaveBtn.disabled = false;
// 	}
// }
// disableBtn();


function targetSaveBtn(e) {
	e.preventDefault();
	if (e.target.classList.contains('idea_save-btn')) {
		makeNewIdea();
		ideaTitleInput.value = "";
		ideaBodyInput.value = "";
		// disableBtn();
	}
}

function makeNewIdea() {
	var idea = new Idea( {
		title: ideaTitleInput.value, 
		body: ideaBodyInput.value, 
		id: Date.now(),
	});
	globalArr.push(idea);
	appendNewCard(idea);
	idea.setLocalStorage(globalArr);
	console.log('Hi');
}



function ideaCardActions(e) {
	e.preventDefault();
	deleteCard(e);
	favoriteIdea(e);
}

function deleteCard(e) {
	if (e.target.classList.contains('img_btn-exit')) {
		e.target.parentNode.parentNode.remove();
	}
// deleteFromStorage(globalArr);
}

function appendNewCard(idea) {
	box.insertAdjacentHTML('afterbegin',
				`<section class="box_card" id=${idea.id}>
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

// filter prototype - deleting things