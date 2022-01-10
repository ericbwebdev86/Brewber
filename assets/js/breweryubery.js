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
    console.log(searchTerm);
    // clear old content
    breweryContainerEl.textContent = "";
    citySearchTerm.textContent = searchTerm;

    // loop over data
    for (var i = 0; i < data.length; i++) {
    // format data
    var breweryName = data[i].name;
    

    // create a container for each brewery
    var breweryEl = document.createElement("div");

    var breweryName = data;
    var breweryNameEl = document.createElement("div");
    breweryNameEl.textContent = "Name: " + breweryName;
    breweryEl.appendChild(breweryNameEl);

    breweryContainerEl.appendChild(breweryEl);
}

};