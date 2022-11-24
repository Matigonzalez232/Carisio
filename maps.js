let map;
let markers = [];
const setListener = () => {
    document.querySelector(".hotel__individualNames").forEach((hotelName, index) => {

        hotelName.addEventListener("click", () => {

            google.map.event.trigger(markers[index], "click")
        })


    })
}

const displayHotelList = () => {
    let hotelHTML = "";
    hotels.forEach(hotel => {
        hotelHTML += ` <h4 class="hotel__individualNames">${hotel.name}</h4>`

    })
    document.getElementById("hotel__names").innetHTML = hotelHTML
}

const createMarker = (coord, name, address, phone) => {
    let html =
        `
    <div class="window">
        <h2>${name}</h2>
        <div class="address">
        <i class="fas fa-map-marker-alt fa-lg" ><i>
        <h3>${address}</h3>
        </div>
        <div class="address">
        <i class="fas fa-phone-alt fa-lg" ><i>
        <h3>${phone}</h3>
        </div>
    
    </div>
    
    `
    const marker = new google.maps.marker(
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
        let coord = new google.maLatLng(hotel.lat, hotel.lng);
        let name = hotel.name;
        bounds.extend(coord),
            createMarkers(coord, name, phone);
        map.fitBounds(bounds);
    })
}

function initmap() {
    let barcerlona = { lat: 41.390205, lng: 2.154007 }
    map = new google.maps.Map(document.getElementById("map"), {
        center: barcerlona,
        zoom: 14,
        // mapId: idDeEstilos
    })

    // console.log(hotels)
    crateLocationMarkers()
    const marker = new google.maps.Marker({
        position: barcerlona,
        map: map,
    })
    infoWindow = new google.maps.infoWindow();
    displayHotelList();
    setListener();
}