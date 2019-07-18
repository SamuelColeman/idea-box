Idea box 

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

// persistedIdeas()

// function persistedIdeas() {
// 	console.log('persistedIdeas');
// 	  globalArr.map(function(ideaObj) {
//       var globalArr = new Idea (ideaObj.id, ideaObj.title, ideaObj.body, ideaObj.quality,
//         ideaObj.star)
//     }
//   }
//   console.log(globalArr);

// function reappendCard() {
// 	console.log('reappendCard')


// function persist() {
//   ideaArray.map(anIdea => appendCard(anIdea));
// }

// function findIndex(event) {
//   var id = findID(event);
//   for (var i = 0; i < ideaArray.length; i++) {
//     if (id === ideaArray[i].id) {
//       return parseInt(i);
//     }
//   }
// }

// function selectID(e) {
//   return parseInt(e.target.closest('.box').dataset.id);
// }
//   function clearInput(input) {
//   input.value = '';
// }

// function persistedIdeas(e) {
	//reinstantiate the object with idea class
	//i is less then length so it pulls out the first 
	// looped though gloabal arr pulls out qualities seperately id title star body quality then put into function that instantiates a new class of idea then push everthing into a global array then use splice to delete the first half of it. get rid of non class. length array/2 then run funchtion that create new cards get info back into first function to create a card 
	// run everything through a create card again to create a new card on the page. 
	// map through array 
// 	if (e.target)

// }

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