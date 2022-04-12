/* User Story

AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly



Acceptance Criteria

GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city




*/


//initialize the variables
//implement the open weather api
//Current Weather API key
const apiKey = "58d56143837e18e5352b2e203d75f67f";

//jquery to dynamically append elements
//create a variable dynamically through jquery
//var currentWeather = $("#currentWeather");

//var currentDay = moment().format('L');
//$("#currentDate").html(currentDay);
//going to put the current day in the current City function


//need an array to put in 
//will need a function for search button
//jquery will be good as a click once function
$("#searchButton").click(function(event){
    event.preventDefault();
    let citySearch = $("#citySearch").val();
    //need to call the functions to return the value 
    currentCityWeather(citySearch);
    //of current weather and forecast
    
    
})



function currentCityWeather(cities){
    var currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=${apiKey}=imperial&units=imperial';

    $.ajax({
        URL: currentWeatherURL,
        method: "GET"
    }).then(function(result){
        console.log(result);
        console.log(currentWeatherURL);
        //empty all of the city weather details
        $("#cityDetails").empty();
        //get the current date
        var currentDate = moment().format('L');
        var weatherIcon = result.weather[0].icon;
        var weatherIconUrl = 'http://openweathermap.org/img/wn/${weatherIcon}.png';

        //dynamically create the html elmenets

        var currentCity =$(<h2  id ="currentCity">${result.name} <img src="${weatherIconUrl}"></img>
        </h2>);
        var newCurrentDate =$("<h6>").text(currentDate);

        var temperature = $("<p>").text("Temperature: " + result.main.temp + "</p>");
        var humidity = $("<p>").text("Humidity: " + result.main.humidity + "</p>");
        var windSpeed = $("<p>").text("Wind Speed:" + result.main.wind.speed + "</p>");

        $("#cityDetails").append(currentCity);
        $("#cityDetails").append(newCurrentDate);
        $("#cityDetails").append(temperature);
        $("#cityDetails").append(humidity);
        $("#cityDetails").append(windSpeed);

        //need another url for currentweather UV 
        //lat and long required to use this api
        //a function for the UV Index
    var lat = result.coord.lat;
    var long = result.coord.lon;    
    var currentWeatherUVUrl = 'https://openweathermap.org/api/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}';

    $.ajax({
        url: currentWeatherUVUrl,
        method: 'GET'
    }).then(function(uviresult){
        var uvIndex = $(<p>
            <span id="indexColor">${uviresult.value}</span>
        </p>);
        $("#cityDetails").append(uvIndex);
        
        //need to do if/statements for the colors

        if(uviresult.value < 3){
            $("#indexColor").css("background-color","green").css("color","black");

        }
        else if(uviresult.value >= 3 && uviresult.value < 7){
            $("#indexColor").css("background-color","yellow").css("color","black");
            
        }
        else if(uviresult.value >= 7){
            $("#indexColor").css("background-color","red").css("color","black");
            
        };
    });

    });
};
//need to use local storage to store the searches




////need a function to show city history
function cityHistory(){

}

//a function for the forecast


//need to get current weather if not in storage


//need another if statement if city clicked 


