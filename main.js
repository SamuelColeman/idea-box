// var Idea = require('idea');

var ideaArr = [];
// var ideaObj = JSON.parse(localStorage.getItem());
var ideaTitleInput = document.querySelector('.idea_title-input');
var ideaBodyInput = document.querySelector('.idea_body-input');
var ideaSaveBtn = document.querySelector('.idea_save-btn');


ideaSaveBtn.addEventListener('click', makeNewIdea);

function makeNewIdea() {
	var idea = new Idea(ideaTitleInput.value, ideaBodyInput.value);
	// ideaArr.push(idea);
	appendNewCard();
	idea.setLocalStorage();
	console.log('Hi');
}

function appendNewCard() {
	var box = document.querySelector('.box');
	box.insertAdjacentHTML('afterbegin',
				`<section class="box_card">
			<header class="box_card-header">
				<!-- images that are buttons -->
				<input class="img_btn-star box_card-icon" src="images/star.svg" type="image">
				<input class="img_btn-exit box_card-icon" src="images/delete.svg" type="image">
			</header>
			<section class="box_card-main">
				<p class="box_card-title">${ideaTitleInput.value}</p>
				<p class="box_card-body">${ideaBodyInput.value}</p>
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