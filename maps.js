//la variable hotels esta definida en global scope por eso podemos acceder a ella desde cualquier parte
let map;
let markers = [];
const setListener = () => {
    document.querySelectorAll(".hotel__individualNames").forEach((hotelName, index) => {

        hotelName.addEventListener("click", () => {

            google.map.event.trigger(markers[index], "click")
        })


    })
}
// llama al arreglo hotels, crea un h4 con el valor.name y desp localiza el div hotel__names e inserta el h4 creado 
const displayHotelList = () => {
    let hotelHTML = "";
    hotels.forEach(hotel => {
        
        hotelHTML += `<h4 class="hotel__individualNames">${hotel.name}</h4>`
        
        // hotelHTML += `<h4 >${hotel.name}</h4>`

    })
    document.getElementById("hotel__names").innerHTML = hotelHTML;
}

const createMarker = (coord, name, address, phone) => {
    let html =
        `
    <div class="window">
        <h2>${name}</h2>
        <div class="address">
        <i class="fas fa-map-marker-alt fa-lg" ></i>
        <h3>${address}</h3>
        </div>
        <div class="phone">
        <i class="fas fa-phone-alt fa-lg" ></i>
        <h3>${phone}</h3>
        </div>
    
    </div>
    
    `
    const marker = new google.maps.Marker(
        {
            position: coord,
            map: map,
            // icon: "./icon/hotel.png"
        }
    )
    google.maps.event.addListener(marker, "click", () => {
        infoWindow.setContent(html);
        infoWindow.open(map, marker)
    })
    markers.push(marker)

}
const createLocationMarkers = () => {
    let bounds = new google.maps.LatLngBounds();
    hotels.forEach(hotel => {
        let coord = new google.maps.LatLng(hotel.lat, hotel.lng);
        let name = hotel.name;
        let address = hotel.address;
        let phone = hotel.phone;
        bounds.extend(coord)
        createMarker(coord, name, address, phone);
        map.fitBounds(bounds);
    })
}

function initMap() {
    let barcelona = { lat: 41.390205, lng: 2.154007 }
    map = new google.maps.Map(document.getElementById("map"), {
        center: barcelona,
        zoom: 14,
        mapId: "8cce66f2ae190c68"
    })

    // console.log(hotels)
    createLocationMarkers()
    const marker = new google.maps.Marker({
        position: barcelona,
        map: map,
    })
    infoWindow = new google.maps.InfoWindow();
    displayHotelList();
    setListener();
}