var breweryContainerEl = document.querySelector("#brewery-container");
var citySearchTerm = document.querySelector("#city-search-term");
var userFormEl = document.querySelector("#brew-form");
var cityInputEl = document.querySelector("#city");
var searchHistoryEl =document.querySelector("#searchHistory")


var cities = []

var formSubmitHandler = function (event) {
    event.preventDefault();


// get value from input element

    var city = cityInputEl.value.trim();

    if (city) {
        getCityBreweries(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a valid city");
    }
};

var getCityBreweries = function (city) {
    // format the api url
    var breweryApiUrl = "https://api.openbrewerydb.org/breweries?by_city=" + city;

    if (city !== '') {
        fetch(breweryApiUrl).then(function(response) {
            response.json().then(function(data) {
                displayBreweries(data, city);
            });

        });
    }
    // make a request to the url
   
};

userFormEl.addEventListener("submit", formSubmitHandler);

var displayBreweries = function (data, searchTerm) {
    console.log(data);
    apiData = data;
    console.log(searchTerm)
    // clear old content
    breweryContainerEl.textContent = "";
    citySearchTerm.textContent = "Breweries near: " + searchTerm;
    if (cities.indexOf(searchTerm)=== -1) {
        cities.push(searchTerm)
    }



    localStorage.setItem("cities", JSON.stringify(cities))
    localStorage.getItem("cities")  
    console.log(cities)
    populateDropdown()
    // loop over data
    for (var i = 0; i < data.length; i++) {
        // format data
        var { name, brewery_type, street, city, state, phone } = data[i];

        let output = `
    <div class="card column is-one-quarter has-background-warning m-2">
        <div class="card-content">
        <p class="title is-4">${name}</p>
            <div class="content">
                <h6>Brewery Type: ${brewery_type}</h6>
                <h6>${street}</h6>
                <h6>${city}, ${state}</h6>
                <h6>Phone: ${phone}</h6>
            </div>
        </div>
    </div>
    `

        document.getElementById('brewery-container').innerHTML += output;
    }
};
//google api start
let map;
let service;
let infowindow;
let pos;
let request;
let place;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 44.269,
            lng: -88.339
        },
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;
    getCoords();
}
function getCoords() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            map.setCenter(pos);
            whatsNearby(pos);
        }, function () {
            locationServicesError(true, infoWindow, map.getCenter());
        });
    } else {
        locationServicesError(false, infoWindow, map.getCenter());
    }
    infowindow = new google.maps.InfoWindow();
}
};



console.log(cities)
function searchHistory(entry) {
    var node = document.createElement("option");
    var textnode = document.createTextNode(entry);
    if (entry !== "Select") {
        node.setAttribute("value", entry)
    } else {
        node.setAttribute("value", '')
    }
    //create on option element
    node.appendChild(textnode)
    searchHistoryEl.appendChild(node)
    //append element to search history
    
}

function populateDropdown () {
   

let citiesList = JSON.parse(localStorage.getItem("cities"))

if (citiesList) {
    while (searchHistoryEl.firstChild) {
        searchHistoryEl.removeChild(searchHistoryEl.firstChild);
    }
    cities=citiesList
    searchHistory("Select")
for (var i = 0; i < cities.length; i++) {
    searchHistory(cities[i]) 
    
}}

}

populateDropdown()

      
function whatsNearby(pos) {
    request = {
        location: pos,
        radius: '500',
        query: 'restaurant'
    };
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
}
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log("callback received " + results.length + " results");
        let bounds = new google.maps.LatLngBounds();
        for (let i = 0; i < results.length; i++) {
            place = results[i];
            let mark = createMarker(results[i]);
            bounds.extend(mark.getPosition());
        }
        map.fitBounds(bounds);
    } else console.log("callback.status=" + status);
}
function locationServicesError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
function createMarker(place) {
    let marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: "http://maps.google.com/mapfiles/ms/micons/red.png"
    });
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
    return marker;
}
let mapBtn = document.querySelector(".map-btn");
let mapDiv = document.querySelector(".map-div");
mapBtn.addEventListener("click", function () {
    if (mapDiv.style.display == "block") {
        mapDiv.style.display = "none";
    } else {
        mapDiv.style.display = "block";
    }

})
//google api end

