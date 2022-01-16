var breweryContainerEl = document.querySelector("#brewery-container");
var citySearchTerm = document.querySelector("#city-search-term");
var userFormEl = document.querySelector("#brew-form");
var cityInputEl = document.querySelector("#city");

// Get the modal
var modal = document.getElementById('id01');
modal.style.display= "block"

//If the user clicks Not 21, don't load page

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }
//If 

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
    citySearchTerm.textContent = "Breweries near: " + searchTerm;

    // loop over data
    for (var i = 0; i < data.length; i++) {
    // format data
    var { name, brewery_type, street, city, state, phone} = data[i];
    
    // Phone number formating, use 'j' because 'i' was already used above
    var phoneArray = phone.split('');

    var formatedNumber = [];
    for(var j = 0; j < phoneArray.length; j++){
        // if it's the 2nd or 5th position in an array, push '-'
      if (j == 2 || j === 5 ){
          formatedNumber.push(phoneArray[j])
        formatedNumber.push('-')
        //otherwise push regular numbers in array
      } else {
        formatedNumber.push(phoneArray[j])
      }
    }

    phone = formatedNumber.join('');
    


  

    
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