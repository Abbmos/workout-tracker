const stars = document.querySelectorAll('.star');
const ratingInput = document.querySelector('#rating-value');
const clearBtn = document.querySelector('#clear-button')

if (ratingInput.value == '') {
	ratingInput.value = 0;
}

const updateStars = (value) => {

	stars.forEach(s => {
		if (s.getAttribute('data-value') <= value) {
			s.classList.add('selected');
		} else {
			s.classList.remove('selected');
		}
	});
};

stars.forEach(star => {
	star.addEventListener('click', () => {
		const value = star.getAttribute('data-value');
		ratingInput.value = value;

		stars.forEach(s => {
			if (s.getAttribute('data-value') <= value) {
				s.classList.add('selected');
			} else {
				s.classList.remove('selected');
			}
		});
	});
});

clearBtn.addEventListener('click', () => {
	stars.forEach(s => {

		s.classList.remove('selected')
		ratingInput.value=0;
	})
})

const existingRating = ratingInput.value;
if (existingRating > 0) {
	updateStars(existingRating);
}