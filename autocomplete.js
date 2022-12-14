const createAutoComplete = ({ root, renderOption }) => {

    // root - свойство из объекта конфигурации, которое содержит в значении элемент для вставки данных
    root.innerHTML = `
        <label><b>Search for a movie</b></label>
        <input class="input">
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;

    const input = root.querySelector('input');// получаем элемент, куда вводятся данные
    const dropdown = root.querySelector('.dropdown'); // выпадающее меню
    const resultsWrapper = root.querySelector('.results'); // блок для вывода результатов

    /**
     * при вводе данных в поле поиска
     */
    const onInput = async event => {
        const movies = await fetchData(event.target.value); // получаем данные о фильмах
        if (!movies.length) { // если данных нет
            dropdown.classList.remove('is-active'); // убираем выпадающее меню
            return;
        }
        resultsWrapper.innerHTML = ''; // удаляем контент предыдужего запроса
        dropdown.classList.add('is-active'); // показываем выпадающее меню
        
        // перебираем массив с найденными фильмами
        movies.forEach( movie => {
            const option = document.createElement('a'); // создаем ссылку
            option.classList.add('dropdown-item'); // добавляем класс

            // формируем внутреннее содержимое ссылки
            option.innerHTML = renderOption(movie);
            
            resultsWrapper.insertAdjacentElement('beforeend', option); // размещаем элемент в документе 

            // добавляем обработчик события на каждую ссылку
            option.addEventListener('click', () => { // если нажали на кино
                dropdown.classList.remove('is-active'); // скрываем выпадающее меню
                input.value = movie.Title; // пишем в input название фильма

                onMovieSelect(movie); // получаем и выводим в документ данные о выбранном фильме
            });
        });
    }

    // вешаем обработчик на поле поиска
    input.addEventListener('input', debounce(onInput, 1000));

    // если кликнули в любое другое место на странице кроме элемента <div class="autocomplete">
    document.addEventListener('click', event => {
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active');// закрываем выпадающий список
        }
    });

};