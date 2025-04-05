const API_KEY = '43ea0eb19a1d3f0b1c3c8c3814d3766b'; // Replace this with your TMDB API key

window.onload = function() {
	init();
	bindListeners();
}

function init() {
	console.log("test test.");
}

function bindListeners() {
	document.getElementById('searchBtn').addEventListener('click', searchMovies);
}

function testClick() {
	console.log("Click Click...");
}

async function searchMovies() {
	const query = document.getElementById('searchBox').value.trim();

	if (!query) return;

	const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		const results = document.getElementById('results');
		results.innerHTML = '';

		if (data.results.length === 0) {
		results.innerHTML = '<p>No movies found.</p>';
		return;
		}

		const rowDiv = document.createElement('div');
		rowDiv.classList.add('row');
		data.results.forEach(movie => {
			const posterPath = movie.poster_path
				? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
				: 'https://via.placeholder.com/200x300?text=No+Image';

			const colDiv = document.createElement('div');
			colDiv.classList.add('col-4');
			colDiv.innerHTML = `
				<img src="${posterPath}" alt="${movie.title}" />
				<h3>${movie.title}</h3>
				<p>${movie.release_date || 'N/A'}</p>
				<p>${movie.overview.slice(0, 100)}...</p>
			`;
			
			rowDiv.appendChild(colDiv);
		});

		results.appendChild(rowDiv);
	} catch (error) {
		console.error('Error fetching movies:', error);
		document.getElementById('results').innerHTML = '<p>Error loading movies.</p>';
	}
}