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

const createMarker = (coord, name) => {
    let html = `<h3>${name}</h3> `
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
        createMarkers(coord, name);
        map.fitBounds(bounds);
    })
}

function initmap() {
    let barcerlona = { lat: 41.390205, lng: 2.154007 }
    map = new google.maps.Map(document.getElementById("map"), {
        center: barcerlona,
        zoom: 14
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