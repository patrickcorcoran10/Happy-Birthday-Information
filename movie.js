
$("#bDate").on("click", function(e) {
e.preventDefault();

var date = $("#date").val().trim()
var year = date.slice(0, 4)
var month = date.slice(5, 7);
console.log(month);
var day = date.slice(8, 10);
console.log(day);
var queryURL = "https://api.themoviedb.org/3/discover/movie?certification_country=US&primary_release_year="+year+"&sort_by=revenue.desc&api_key=51eb03086e20d27aa96dcce0ddf7d6a0";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
    $("#plot").text(response.results[0].original_title);
    // var posterURL = response.results[0].poster_path;
    // var posterImage = $("<img>");
    // posterImage.attr("src='https://image.tmdb.org/t/p/w500" + , posterURL + "'");
    // posterImage.attr("alt", "poster image");
    // $("#poster").append(posterImage);
});
});