const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')
const weatherImage = document.querySelector('#weather-img')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    address = search.value
    
    query = '/weather?address=' + address
    
    msg1.textContent = 'Loading..'    
    msg2.textContent = ''
    weatherImage.src = ''
    
    fetch(query).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error   
                console.log(data.error);
            } else {
                msg1.textContent = data.location   
                msg2.textContent = data.forecastData
                weatherImage.src = data.weatherIconsURL
            }
        })
    })
})