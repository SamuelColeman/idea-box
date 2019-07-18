var globalArr = JSON.parse(localStorage.getItem('ideaArr')) || [];

var ideaTitleInput = document.querySelector('.idea_title-input');
var ideaBodyInput = document.querySelector('.idea_body-input');
var ideaContainer = document.querySelector('.idea');

// ideaTitleInput.addEventListener('keyup', )

ideaContainer.addEventListener('click', targetSaveBtn);

function targetSaveBtn(e) {
	e.preventDefault();
	if (e.target.classList.contains('idea_save-btn')) {
		makeNewIdea();
	}
}

function makeNewIdea() {
	var idea = new Idea( {
		title: ideaTitleInput.value, 
		body: ideaBodyInput.value, 
		id: Date.now(),
	});
	// ideaArr.push(idea);
	globalArr.push(idea);
	appendNewCard(idea);
	idea.setLocalStorage(globalArr);
	console.log('Hi');
}
var box = document.querySelector('.box');

box.addEventListener('click', function() {
	deleteCard()
	// favoriteIdea()
	});

function deleteCard(e) {
	if (e.target.classList.contains('img_btn-exit')) {
		e.target.parentNode.parentNode.remove();
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

// function favoriteIdea(e) {
// 	var favoritedIdea = document.querySelector('.img_btn-starActive');
// 	var inactiveStar = document.querySelector('.img_btn-star');
// 	if (e.target.classList.contains('img_btn-star')) {
// 		favoritedIdea.classList.remove('hidden');
// 		inactiveStar.classList.add('hidden');
// 	} else {
// 		favoritedIdea.classList.add('hidden');
// 		inactiveStar.classList.remove('hidden');
// 	}
// }

// ideaArr[0].id 

// filter prototype - deleting things