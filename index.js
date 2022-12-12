const fetchData = async () => {

    const response = await axios.get('http://www.omdbapi.com/', {
        params:{
           apikey: 'e74fe266',
           s: 'blue'
        }
    });
    console.log(response.data);


}

fetchData();