const startAddMovieBtn = document.querySelector("header button");
const addMovieModal = document.getElementById("add-modal");
const addBackdropElement = document.getElementById("backdrop");
const cancelAddMovieBtn = addMovieModal.querySelector(".btn--passive");
//const successAddMovieBtn = addMovieModal.querySelector('.btn--success');
const successAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
//const userInputs = addMovieModal.getElementsByTagName('input');
const movies = [];
const databaseSection = document.getElementById("entry-text");
const listRoot = document.getElementById("movie-list");
const deleteMovieModal = document.getElementById("delete-modal");

const toggleBackdrop = () => {
  addBackdropElement.classList.toggle("visible");
};

const updateUI = () => {
  if (movies.length === 0) {
    databaseSection.style.display = "block";
  } else {
    databaseSection.style.display = "none";
  }
};

const cancelMovieDeletion = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove("visible");
};

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  listRoot.children[movieIndex].remove();
  //another approach for remove
  //listRoot.removeChild(listRoot.children[movieIndex]);
  cancelMovieDeletion();
  updateUI();
};

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};

const deleteMovieHandler = movieId => {
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();
  const cancelDeletionBtn = deleteMovieModal.querySelector(".btn--passive");
  let confirmDeletionBtn = deleteMovieModal.querySelector(".btn--danger");

  confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
  confirmDeletionBtn = deleteMovieModal.querySelector(".btn--danger");

  cancelDeletionBtn.removeEventListener('click', cancelMovieDeletion);

  cancelDeletionBtn.addEventListener("click", cancelMovieDeletion);
  confirmDeletionBtn.addEventListener("click", deleteMovie.bind(null, movieId));
  //deleteMovie(movieId);
};

const renderMovieElements = (id, title, imageUrl, rating) => {
  const movieElements = document.createElement("li");
  movieElements.className = "movie-element";
  movieElements.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5star</p>
        </div>
    `;
  movieElements.addEventListener("click", deleteMovieHandler.bind(null, id));
  listRoot.appendChild(movieElements);
};

const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  clearInputs();
  toggleBackdrop();
};

const clearInputs = () => {
  for (const userInput of userInputs) {
    userInput.value = '';
  }
};

const successAddMovieHandler = () => {
  const titleInput = userInputs[0].value;
  const imageUrlInput = userInputs[1].value;
  const ratingInput = userInputs[2].value;

  if (
    titleInput.trim() === "" ||
    imageUrlInput.trim() === "" ||
    ratingInput === "" ||
    ratingInput < 1 ||
    ratingInput > 5
  ) {
    alert("Please enter a valid values (rating between 1 and 5).");
    return;
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleInput,
    image: imageUrlInput,
    rating: ratingInput,
  };
  movies.push(newMovie);
  closeMovieModal();
  clearInputs();
  toggleBackdrop();
  renderMovieElements(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
};

const backDropClickHandler = () => {
  closeMovieModal();
  cancelMovieDeletion();
  clearInputs();
};

startAddMovieBtn.addEventListener("click", showMovieModal);

addBackdropElement.addEventListener("click", backDropClickHandler);

cancelAddMovieBtn.addEventListener("click", cancelAddMovieHandler);

successAddMovieBtn.addEventListener("click", successAddMovieHandler);
