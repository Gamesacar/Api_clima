const container = document.querySelector('.weather-content')
const formulario = document.querySelector('.get-weather')
const resultado = document.querySelector('.result')

const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if (nameCity.value === '' || nameCountry.value === '') {
        mostrarError('Ambos campos son obligatorios');
        return;
    }

    console.log(nameCity.value);
    console.log(nameCountry.value);

    callAPI(nameCity.value, nameCountry.value);

})

function mostrarError(mensaje){
    console.log(mensaje)
}


function callAPI(city, country){
    const apiId = '5c6c5a029b957c4e60601ca6913348e2';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;


    fetch(url)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            if (dataJSON.cod === '404') {
                showError('Ciudad no encontrada...');
            } else {
                clearHTML();
                showWeather(dataJSON);
            }
            console.log(dataJSON);
        })
        .catch(error => {
            console.log(error);
        })
}