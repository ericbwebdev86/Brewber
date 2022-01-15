var breweryContainerEl = document.querySelector("#brewery-container");
var citySearchTerm = document.querySelector("#city-search-term");
var userFormEl = document.querySelector("#brew-form");
var cityInputEl = document.querySelector("#city");
var searchHistoryEl =document.querySelector("#searchHistory")


var cities = []

var formSubmitHandler = function(event) {
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

var getCityBreweries = function(city) {
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

var displayBreweries = function(data, searchTerm) {
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
    var { name, brewery_type, street, city, state, phone} = data[i];
    
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
