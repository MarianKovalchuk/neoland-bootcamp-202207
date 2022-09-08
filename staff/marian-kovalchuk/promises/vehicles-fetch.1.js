fetch('http://b00tc4mp.herokuapp.com/api/hotwheels/vehicles?q=mario')
    .then(res => res.json())
    .then(vehicles => console.log(vehicles))

fetch('https://b00tc4mp.herokuapp.com/api/hotwheels/vehicles/DHT14')
    .then(res => res.json())
    .then(vehicle => console.log(vehicle))

function searchVehiclesFull(query) {
    // TODO
}