/**
 * получение данных от API по данным из поиска
 */
const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params:{
           apikey: 'e74fe266',
           s: searchTerm
        }
    });
    if(response.data.Error){
        return [];
    }
    return response.data.Search;
}

/**
 * создаем элемент поиска, вешаем обработчик события
 */
createAutoComplete({
    root: document.querySelector('.autocomplete'),
    renderOption(movie){
        return `
            <img src="${movie.Poster === 'N/A' ? '' : movie.Poster}">
            <h1>${movie.Title} (${movie.Year})</h1>
        `;
    }
});

// получаем данные об одном фильме
const onMovieSelect = async movie => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params:{
           apikey: 'e74fe266',
           i: movie.imdbID
        }
    });
    
    // выводим в документ сформированную разметку
    document.getElementById('summary').innerHTML = movieTemplate(response.data);
};

// формируем разметку
const movieTemplate = movieDetail => {
    return `
        <article class="media">
            <figure class="media-left">
            <p class="image">
                <img src="${movieDetail.Poster}" alt="">
            </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>

        <article class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>

        <article class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>

        <article class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>

        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>

        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;
};