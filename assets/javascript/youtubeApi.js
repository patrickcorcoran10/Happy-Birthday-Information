

$("#submit").on("click", function(e) {
    e.preventDefault();
    var date = $("#date-input").val().trim();

    var year = date.slice(0, 4)
    var month = date.slice(5, 7);
    console.log(month);
    var day = date.slice(8, 10);
    console.log(day);
    if (day =)
    var queryURL = "https://api.themoviedb.org/3/discover/movie?certification_country=US&primary_release_year="+year+"&sort_by=revenue.desc&api_key=51eb03086e20d27aa96dcce0ddf7d6a0";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
///////////////
for (var i = 0; i < 3; i++) {
  var posterURL = response.results[i].poster_path;
  var posterURLCount = i + 1;

 
        $("#movieOMDB-section").append(response.results[i].original_title);
        // $("#movieOMDB-section").append(response.results[1].original_title);
        // $("#movieOMDB-section").append(response.results[2].original_title);
        // var posterURL = response.results[0].poster_path;
        var posterImage = $("<img>");
        var posterImage2 = $("<img>");
        var posterImage3 = $("<img>");
        posterImage.attr("src","https://image.tmdb.org/t/p/w500" +  posterURL );
        posterImage.attr("alt", "poster image");
        $("#poster").append(posterImage[0]);
        $("#poster2").append(posterImage2[1]);
        $("#poster3").append(posterImage3[2]);
      };
    });

    // var date2 = $("date-input").val().trim();
    var name = $("#artist-input").val().trim();
    console.log(name);
    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCMAtGuHXZbuWCIu5qzoTMqg&q=" + name + "&key=AIzaSyDt345apnnfJAcLDzf1_Iw5gSb7cbT_zWw";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(response.items[0].id.videoId);
        hbdVideo = response.items[0].id.videoId;
        console.log(hbdVideo);

        $("#video").attr("src", "https://www.youtube.com/embed/"+hbdVideo);

    });
});
