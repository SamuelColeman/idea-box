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

box.addEventListener('click', deleteCard);

function deleteCard(e) {
	if (e.target.classList.contains('img_btn-exit')) {
		e.target.parentNode.parentNode.remove();
	}
}

function appendNewCard(idea) {
	box.insertAdjacentHTML('afterbegin',
				`<section class="box_card" data-id=${idea.id}>
			<header class="box_card-header">
				<!-- images that are buttons -->
				<input class="img_btn-star box_card-icon" src="images/star.svg" type="image">
				<input class="img_btn-exit box_card-icon" src="images/delete.svg" type="image">
			</header>
			<section class="box_card-main">
				<p class="box_card-title">${idea.title}</p>
				<p class="box_card-body">${idea.body}</p>
			</section>
			<footer class="box_card-footer">
				<!-- image button -->
				<input class="footer_quality-up box_card-icon" src="images/upvote.svg" type="image">
				<p class="box_card-quality">Quality:
					<span class="box_card-value">Swill
					</span>
				</p>
				<!-- image button -->
				<input class="footer_quality-down box_card-icon" src="images/downvote.svg" type="image">
			</footer>
		</section>`);
}


// ideaArr[0].id 

// filter prototype - deleting things