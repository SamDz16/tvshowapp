const form = document.querySelector('#movies');
const images = document.querySelector('#images');

form.addEventListener('submit', async function (e) {
	e.preventDefault();

	images.textContent = '';

	const movieName = this.elements.movie.value;
	const movies = await fetchMovies(movieName);

	displayMovies(movies);

	this.elements.movie.value = '';
});

const fetchMovies = async (movieName) => {
	try {
		const config = { params: { q: movieName } };
		const response = await axios.get(
			'https://api.tvmaze.com/search/shows',
			config
		);
		return response.data;
	} catch (e) {
		console.log('OH SORRY. There was an error', e);
	}
};

const displayMovies = (movies) => {
	if (movies.length === 0) {
		const p = document.createElement('p');
		p.classList.add(
			'column',
			'is-size-4',
			'has-text-danger',
			'has-text-centered'
		);
		p.innerHTML = `&#10060; `;
		p.append('Sorry, there is no TV show matching your search input');
		images.append(p);
	} else {
		for (let movie of movies) {
			if (movie.show.image) {
				// column
				const column = document.createElement('div');
				column.classList.add('column', 'is-one-third');

				// card
				const card = document.createElement('div');
				card.classList.add('card');

				column.append(card);

				// card.style.width = '30%';

				// card image
				const cardImage = document.createElement('div');
				cardImage.classList.add('card-image');

				// figure
				const figure = document.createElement('figure');
				figure.classList.add('image', 'is-4by3');

				const a = document.createElement('a');
				a.setAttribute('href', movie.show.officialSite);
				a.target = '_blank';

				const img = document.createElement('img');
				img.setAttribute('src', movie.show.image.medium);
				img.alt = movie.show.name;

				a.append(img);

				figure.append(a);

				cardImage.append(figure);

				card.append(cardImage);

				// card header
				const cardHeader = document.createElement('header');
				cardHeader.classList.add('card-header');

				// card header title
				const cardHeaderTitle = document.createElement('p');
				cardHeaderTitle.append(movie.show.name);
				cardHeaderTitle.classList.add(
					'card-header-title',
					'is-size-3',
					'has-text-centered'
				);

				cardHeader.append(cardHeaderTitle);

				card.append(cardHeader);

				// card content
				const cardContent = document.createElement('div');
				cardContent.classList.add('card-content');

				const content = document.createElement('div');
				content.classList.add('content');

				content.innerHTML = movie.show.summary;
				content.innerHTML += `<b>TYPE: ${movie.show.type}</b>`;

				cardContent.append(content);

				card.append(cardContent);

				images.append(column);
			}
		}
	}
};
