

$("#name").on("click", function(e) {
    e.preventDefault();
    var date = $("#bday").val().trim()

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
        $("#plot").append(response.results[0].original_title);
        $("#plot").append(response.results[1].original_title);
        $("#plot").append(response.results[2].original_title);
        // var posterURL = response.results[0].poster_path;
        // var posterImage = $("<img>");
        // posterImage.attr("src='https://image.tmdb.org/t/p/w500" + , posterURL + "'");
        // posterImage.attr("alt", "poster image");
        // $("#poster").append(posterImage);
    });
});

//////////////////////////////////////////////////////////

$("#nameSubmit").on("click", function(e) {
    e.preventDefault();
    var date = $("#bday").val().trim();
    var name = $("#name").val().trim();
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

        $("#video").attr(src, "http://www.youtube.com/embed/" + hbdVideo + "");

        // 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: hbdVideo,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}

    });
});
