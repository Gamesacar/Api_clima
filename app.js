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

    Consulta_api(nameCity.value, nameCountry.value);

})

function mostrarError(mensaje){
    console.log(mensaje)
}


function Consulta_api(ciudad, pais){
    const apiId = '5c6c5a029b957c4e60601ca6913348e2';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiId}`;
    console.log(url)

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
            //console.log(dataJSON);
        })
        .catch(error => {
            console.log(error);
        })


}

function showWeather(data){
    const {name, main:{temp, temp_min, temp_max,humidity}, weather:[arr]} = data;

    const grados = kelvin_centigrados(temp);
    const min = kelvin_centigrados(temp_min);
    const max = kelvin_centigrados(temp_max);

    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${grados}°C</h2>
        <p>Max: ${max}°C</p>
        <p>Min: ${min}°C</p>
        <p>humedad: ${humidity}%</p>
    `;

    resultado.appendChild(content);

}


function kelvin_centigrados(temp){
    return parseInt(temp - 273.15);
}

function clearHTML(){
    resultado.innerHTML = '';
}
function showError(message){


    Swal.fire({
        title:"😭" ,
        text: message,
      });
}
