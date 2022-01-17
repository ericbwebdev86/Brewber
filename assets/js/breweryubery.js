var breweryContainerEl = document.querySelector("#brewery-container");
var citySearchTerm = document.querySelector("#city-search-term");
var userFormEl = document.querySelector("#brew-form");
var cityInputEl = document.querySelector("#city");

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
    
    // make a request to the url
    fetch(breweryApiUrl).then(function(response) {
        response.json().then(function(data) {
            displayBreweries(data, city);
        });
    });
};

userFormEl.addEventListener("submit", formSubmitHandler);

var displayBreweries = function(data, searchTerm) {
    console.log(data);
    apiData = data;
    console.log(searchTerm);
    // clear old content
    breweryContainerEl.textContent = "";
    citySearchTerm.textContent = searchTerm;

    // loop over data
    for (var i = 0; i < data.length; i++) {
    // format data
    var { name, brewery_type, street, city, state} = data[i];
    
    let output = `
    <div class="card column has-background-info">
        <div class="card-content">
            <div class="content">
                <h4>${name}</h4>
                <h6>Brewery Type: ${brewery_type}</h6>
                <h6>${street}</h6>
                <h6>${city}, ${state}</h6>
                </div>
        </div>
    </div>
    `
    document.getElementById('brewery-container').innerHTML += output;

    // create a container for each brewery
    // var breweryEl = document.createElement("div");

    // var breweryName = data;
    // var breweryNameEl = document.createElement("div");
    // breweryNameEl.textContent = "Name: " + breweryName;
    // breweryEl.appendChild(breweryNameEl);

    // breweryContainerEl.appendChild(breweryEl);
}
};

import { createClient } from 'pexels';

const client = createClient('563492ad6f91700001000001ea5871cfabd5487e88a6e19553ced5e3');

var picsApiUrl = "https://api.pexels.com/v1/search?query=beer";
 
fetch(picsApiUrl);







