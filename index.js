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
    movies.forEach(movie => {
        const option = document.createElement('a');
        option.classList.add('dropdown-item');

        option.innerHTML = `
            <img src="${movie.Poster === 'N/A' ? '' : movie.Poster}">
            <h1>${movie.Title}</h1>
        `;
        
        resultsWrapper.insertAdjacentElement('beforeend', option);

        // если нажали на кино, скрываем выпадающее меню
        option.addEventListener('click', event => {
            dropdown.classList.remove('is-active');
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