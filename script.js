const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7425c3a05be8c97d468d3267810e4219&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?api_key=7425c3a05be8c97d468d3267810e4219&query=';

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");
const BACKEND_API = "http://localhost:8000/api/v1/reviews";

returnMovies(APILINK);

function returnMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      main.innerHTML = ""; // pra não acumular tudo
      data.results.forEach(element => {

        const div_row = document.createElement('div');
        div_row.setAttribute('class', 'row');

        const div_column = document.createElement('div');
        div_column.setAttribute('class', 'column');

        const div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');

        const image = document.createElement('img');
        image.setAttribute('class', 'thumpnail');
        image.src = element.poster_path ? (IMG_PATH + element.poster_path) : "";

        const title = document.createElement('h3');
        title.innerHTML = element.title;

        const center = document.createElement('center');
        center.appendChild(image);

        div_card.appendChild(center);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);
        main.appendChild(div_row);
      });
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchItem = search.value.trim();
  if (searchItem) {
    returnMovies(SEARCHAPI + encodeURIComponent(searchItem));
    search.value = "";
  }
});
