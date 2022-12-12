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
    console.log(response.data);

}

const input = document.querySelector('input');// получаем инпут

let timeoutId;// идентификатор задержки
// при вводе данных в поле ввода
input.addEventListener('input', (event) => {
    if(timeoutId){ // если есть id 
        clearTimeout(timeoutId); // очищаем интервал
    }
    timeoutId = setTimeout(()=>{ // устанавливаем новый
        fetchData(event.target.value);
    }, 1000); // когда секунда пройдет, получаем данные
    
});