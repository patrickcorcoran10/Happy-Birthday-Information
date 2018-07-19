// $("#submit").on("click", function(event){
//   // event.preventDefault() can be used to prevent an event's default behavior.
//   // It prevents the submit button from trying to submit a form when clicked
//   event.preventDefault();
//   $("#weather-section").empty();
//
//   // Here we grab the date input from the input box
//   var date = $("#date-input").val();
//
//
//   // Here we construct our URL --- using this api "https://www.weatherbit.io/api/ag-weather-api"
//   var queryURL = "https://api.weatherbit.io/v2.0/history/hourly?&city=chicago&start_date=2018-07-12&end_date=2018-07-13&key=00f9aa6382d745aa8e61be7f00f656fa";
//
//   $.ajax({
//     url: queryURL,
//     method: "GET",
//   }).done(function(result) {
//     console.log(result);
//     $("#weather-section").text(JSON.stringify(result));
//
//
//     // Log the queryURL
//     console.log(queryURL);
//
//     // Log the resulting object
//     console.log(response);
//
//     // Transfer content to HTML
//     $(".city").html("<h1>" + response.name + " Weather Details</h1>");
//     $(".wind").text("Wind Speed: " + response.wind.speed);
//     $(".humidity").text("Humidity: " + response.main.humidity);
//     $(".temp").text("Temperature (F) " + response.main.temp);
//
//     // Log the data in the console as well
//     console.log("Wind Speed: " + response.wind.speed);
//     console.log("Humidity: " + response.main.humidity);
//     console.log("Temperature (F): " + response.main.temp);
//
//
//
//
//     for (var i = 0; i < 5; i++) {
//         var weather = result.data[i];
//         var weatherCount = i + 1;
//         var $weatherList = $("<ul>");
//         var temperature = weather.temperature;
//         console.log(temperature);
//         $("#weather-section").append($weatherList);
//         var temperatureItem = weather.temperature;
//         var $weatherListItem = $("<li class='list-group-item temperatureItem'>");
//           $weatherListItem.append(
//             "<span class='label label-primary'>" + weatherCount + "</span>" + "<strong> " + temperatureItem + "</strong>");
//
//
//     }});
//   });


// This .on("click") function will trigger the AJAX Call
$("#submit").on("click", function(event) {

  // event.preventDefault() can be used to prevent an event's default behavior.
  // Here, it prevents the submit button from trying to submit a form when clicked
  event.preventDefault();

  // Here we grab the text from the input box
  var birthLocation = $("#birth-location-input").val();

  var date = $("#date-input").val();
  var momentBDay = moment(date).format("YYYYMMDD");
  console.log(momentBDay);

  var year = moment(momentBDay).format("YYYY");
  console.log(year);
  var month = moment(momentBDay).format("MM");
  console.log(month);
  var day = moment(momentBDay).format("DD");
  console.log(day);
  var a = parseInt(day);
  var b = a + 1;
  console.log(b);
  var c = b.toString();
  var endDay = c;
  // var endDay = moment(momentBDay, "YYYYMMDD").add(1, "DD");
  console.log(endDay);

  // var back30Days=moment().subtract(30, 'days').format("dddd, MMMM Do YYYY, h:mm:ss p");

  // console.log('back30Days --> ' + back30Days);

  // var endDay =  moment(date, "HH:mm").add(1, "minutes");

  // Here we construct our URL
  // https://www.weatherbit.io/api/ag-weather-api

  var queryURL = "https://api.weatherbit.io/v2.0/history/hourly?&city=" + birthLocation + "&start_date=2018-07-" + day + ":11&end_date=2018-07-" + endDay + ":11&key=00f9aa6382d745aa8e61be7f00f656fa";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log(response);
    var cityName = response.city_name;
    var rain = response.data[11].precip;
    var snow = response.data[11].snow;
    var tempCel = response.data[11].temp;
    var weatherDescription = response.data[11].weather.description;
    console.log(cityName, rain, snow, tempCel, weatherDescription);
  //   $("#general-view").text(JSON.stringify(response));
  });

  // -----------------------------------------------------------------------

});
