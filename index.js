/**
 * получение данных от API
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

const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search for a movie</b></label>
    <input class="input">
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

const input = document.querySelector('input');// получаем инпут
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');
  
const onInput = async event => {
    const movies = await fetchData(event.target.value); // получаем данные
    if (!movies.length) {
        dropdown.classList.remove('is-active');
        return;
    }
    resultsWrapper.innerHTML = ''; // удаляем контент предыдужего запроса
    dropdown.classList.add('is-active'); // показываем выпадающее меню
    
    // выводим найденные данные
    movies.forEach( movie => {
        const option = document.createElement('a');
        option.classList.add('dropdown-item');

        option.innerHTML = `
            <img src="${movie.Poster === 'N/A' ? '' : movie.Poster}">
            <h1>${movie.Title}</h1>
        `;
        
        resultsWrapper.insertAdjacentElement('beforeend', option); // размещаем элемент в документе 

        option.addEventListener('click', () => { // если нажали на кино
            dropdown.classList.remove('is-active'); // скрываем выпадающее меню
            input.value = movie.Title; // пишем в input название фильма

            onMovieSelect(movie); // получение данных о выбранном фильме
        });
    });
}

input.addEventListener('input', debounce(onInput, 1000));

// если кликнули в любое другое место на странице кроме элемента <div class="autocomplete">
document.addEventListener('click', event => {
    if (!root.contains(event.target)) {
        dropdown.classList.remove('is-active');// закрываем выпадающий список
    }
});

const onMovieSelect = async movie => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params:{
           apikey: 'e74fe266',
           i: movie.imdbID
        }
    });
    console.log(response.data);
};