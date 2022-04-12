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

//need a const lat and long API so will use GEO coordinates

//need an array to put in 
//will need a function for search button
//jquery will be good as a click once function
$("#searchButton").click(function(event){
    event.preventDefault();
    let citySearch = $("#citySearch").val();
    //need to call the functions to return the value 
    //currentCityWeather(citySearch);
    //of current weather and forecast

     let cityName;
    
    var currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid='+apiKey;

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
        var weatherIconUrl = 'https://openweathermap.org/img/wn/${weatherIcon}.png';

        //dynamically create the html elmenets
        //console did not like this check below have to do something else.
        //var currentCity =$(<h2 id ="currentCity">${result.name}</h2>);

        var currentCity = $("<h2>").text(result.name);
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
    var currentWeatherUVUrl = 'https://openweathermap.org/api/uvi?lat='+lat+'&lon='+long+'&appid='+apiKey;

    $.ajax({
        url: currentWeatherUVUrl,
        method: 'GET'
    }).then(function(uviresult){
        var uvIndex = $("<p>").text("")
        /*var uvIndex = $(<p>
            <span id="indexColor">${uviresult.value}</span>
        </p>);*/
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
    forecast(lat,long);
    });
});
    
/*
function geoCoordinates(){
      var geoCoordinate = 'https://api.openweathermap.org/geo/1.0/direct?q='+citySearch+'&appid='+ apiKey;
     $.ajax({
         URL:geoCoordinate,
         method:"GET"
     }).then(function(coordinate){
         const lat = coordinate.coord.lat;
         const long = coordinate.coord.lon;
        
       
     })
}
*/

/*
function currentCityWeather(cityName){
    let cityName;
    
    var currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid='+apiKey;

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
        var weatherIconUrl = 'https://openweathermap.org/img/wn/${weatherIcon}.png';

        //dynamically create the html elmenets
        //console did not like this check below have to do something else.
        //var currentCity =$(<h2 id ="currentCity">${result.name}</h2>);

        var currentCity = $("<h2>").text(result.name);
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
    var currentWeatherUVUrl = 'https://openweathermap.org/api/uvi?lat='+lat+'&lon='+long+'&appid='+apiKey;

    $.ajax({
        url: currentWeatherUVUrl,
        method: 'GET'
    }).then(function(uviresult){
        var uvIndex = $("<p>").text("")
        /*var uvIndex = $(<p>
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
    forecast(lat,long);
    });
};*/
//need to use local storage to store the searches


//a function for the forecast
function forecast(lat,long){
    var fiveDayURL = 'https://api.openweathermap.org/data/2.5/forecast?lat'+lat+'&lon='+long+'&appid='+apiKey;

    $.ajax({
        URL: fiveDayURL,
        method: 'GET'
    }).then(function(fiveDayResult){
        //need to store the array of 5 days in a variable

        var forecastFive = fiveDayResult.list;

        $("#5dayCast").empty();
       
        for(let i = 1; i < fiveDayResult.length; i++){
            var info = {
                date: fiveDayResult.daily[i].dt,
                icon: fiveDayResult.daily[i].weather[0].icon,
                temperature:  fiveDayResult.daily[i].temp,
                humidity: fiveDayResult.daily[i].humidity
            }
        }
        //var weatherIconUrl = <img src = "http://openweathermap.org/img/wn/${info.icon}.png" />
        var fifthDate = moment().format('L');
        var fiveDayForecastDisplay = /*$(
            <div class = "card-body">
            <h6>${fifthDate}</h6>
            <p>${weatherIconUrl}</p>
            <p>Temp: ${info.temperature}</p>
            <p>Humidity: ${info.humidity}</p>
            </div>
        )*/

        $("#5DayCast").append(fiveDayForecastDisplay)
    });
}


////need a function to show city history
function cityHistory(){

}



//need to get current weather if not in storage


//need another if statement if city clicked 


