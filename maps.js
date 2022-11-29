//la variable hotels esta definida en global scope por eso podemos acceder a ella desde cualquier parte
let map;
let markers = [];
let categoria = "";
// const isVisible = "is-visible";
// const setListener = () => {
//     document.querySelectorAll(".hotel__individualNames").forEach((hotelName, index) => {

//         hotelName.addEventListener("click", () => {

//             google.map.event.trigger(markers[index], "click")
//         })


//     })
// }
function cambiarCategoria(opcion) {
    categoria = opcion;
    if (categoria == "") {
        createLocationMarkers(listado.hotels);

    } else if (categoria == "paradas") {
        createLocationMarkers(listado.paradas);

    } else if (categoria == "informacion") {
        createLocationMarkers(listado.informacion);

    } else if (categoria == "luminarias") {
        createLocationMarkers(listado.luminarias);

    }

}
// llama al arreglo hotels, crea un h4 con el valor.name y desp localiza el div hotel__names e inserta el h4 creado 
// const displayHotelList = () => {
//     let hotelHTML = "";
//     hotels.forEach(hotel => {

//         hotelHTML += `<h4 class="hotel__individualNames">${hotel.name}</h4>`

//         // hotelHTML += `<h4 >${hotel.name}</h4>`

//     })
//     document.getElementById("hotel__names").innerHTML = hotelHTML;
// }

const removeAllMarkers = () => {
    markers.forEach((element,index) => {
        markers[index].setMap(null);
    })
}

const showModal = (marker_data) => {
    document.getElementById("modal-title").textContent = marker_data.titulo;
    document.getElementById("modal-subtitle").textContent = marker_data.subtitulo;
    document.getElementById("modal-text").textContent = marker_data.texto;
    $("#Modal").modal();
}

const createMarker = (marker_data) => {
    let coord = new google.maps.LatLng(marker_data.lat, marker_data.lng);

    const marker = new google.maps.Marker(
        {
            position: coord,
            map: map,
            // icon: "./icon/hotel.png"
        }
    )
    google.maps.event.addListener(marker, "click", () => {
        showModal(marker_data);

        // console.log("funciona")
        // let modal =  document.getElementById("Modal")
        // modal.classList.add("show");
        // modal.style.display="block";
        // document.getElementById("Modal").classList.add(isVisible);
        // infoWindow.setContent(html);
        // infoWindow.open(map, marker)
    })
    markers.push(marker)

}
const createLocationMarkers = (listado) => {
    removeAllMarkers();
    
    let bounds = new google.maps.LatLngBounds();

    listado.forEach(item => {
        let coord = new google.maps.LatLng(item.lat, item.lng);
        bounds.extend(coord)
        createMarker(item);
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
    createLocationMarkers(listado.hotels)
    // const marker = new google.maps.Marker({
    //     position: barcelona,
    //     map: map,
    // })
    // infoWindow = new google.maps.InfoWindow();
    // displayHotelList();
    setListener();
}