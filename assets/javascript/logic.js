$(document).ready(function() {
  $("#myBtn").hide();
  $("#confetti").hide();
  $("#message").hide();
});

// -----------------------------------------------------------------------------------
// START FIREBASE
// -----------------------------------------------------------------------------------

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCxmvJ0x5c4sdzxyPsxehu4iPyC5L0OSOs",
  authDomain: "project-1-3ddd9.firebaseapp.com",
  databaseURL: "https://project-1-3ddd9.firebaseio.com",
  projectId: "project-1-3ddd9",
  storageBucket: "project-1-3ddd9.appspot.com",
  messagingSenderId: "225277028794"
};

firebase.initializeApp(config);

var database = firebase.database();
// on click function to accept data inputs
$("#submit").on("click", function(event){
    event.preventDefault();

    // Collecting input from user

    var currentMonth = (new Date).getMonth() + 1;
    var currentDay = (new Date).getDate();
    var nameOfUser = $("#userName-input").val().trim();
    var birthLocation = $("#birth-location-input").val().trim();
    var birthDate = $("#date-input").val().trim();
    var dateInput = $("#date-input").val().split('-'),
    dateMonth = parseInt(dateInput[1]),
    dateDay = parseInt(dateInput[2]);
// jquery hiding code. this is meant to hide and show elemnts of the html based off birth month//
    if ((dateMonth == currentMonth) && (dateDay == currentDay)) {
      $("#jumbotron").hide();
      $("#nyTimes-container").hide();
      $("#article-section").hide();
      $("#movieOMDB-container").hide();
      $("#movieOMDB-section").hide();
      $("#video").show();
      $("#youtube-section").show();
      $("#financial-container").hide();
      $("#financial-section").hide();
      $("#poster").hide();
      $("#table").hide();
      $("#poster2").hide();
      $("#poster3").hide();
      $("#data-dump-table").hide();
      $("#movie-header").hide();
      $("#confetti").show();
      $("#message").show();
      $("#myBtn").show();
      celebrate();
    } else {
      $("#jumbotron").show();
      $("#nyTimes-container").show();
      $("#article-section").show();
      $("#movieOMDB-container").show();
      $("#movieOMDB-section").show();
      $("#video").hide();
      $("#youtube-container").hide();
      $("#youtube-section").hide();
      $("#financial-container").show();
      $("#financial-section").show();
      $("#poster").show();
      $("#table").show();
      $("#poster2").show();
      $("#poster3").show();
      $("#data-dump-table").show();
      $("#movie-header").show();
      $("#confetti").hide();
      $("#message").hide();
      $("#myBtn").hide();
    };

    // Creating a new local "temporary" object for that holds input data
    var newItem = {
      userName: nameOfUser,
      place: birthLocation,
      dateOfBirth: birthDate,
    };

    // Uploading this train data to the Firebase database
    database.ref().push(newItem);

    // Logging everything to the console
    // This could be uncommented, but it is good to keep so that it is easy to verify the behavior in both Firebase and the console.
    console.log(newItem.userName);
    console.log(newItem.place);
    console.log(newItem.dateOfBirth);
    // NYT API code. pulling the top articles based on birth date. 
    $("#article-section").empty();
    var birthday = $("#date-input").val();
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "c2a6882d365346fabaad70c46f8eb4bf",
      'begin_date': birthday,
      'end_date': birthday
    });
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
        console.log(result);
        for (var i = 0; i < 5; i++) {
            var article = result.response.docs[i];
            var articleCount = i + 1;
            // toaking the list items and using jQuery to put them into listed items. 
            var $articleList = $("<ul>");
            var byline = article.byline;
            // appending the list into the html into the "article-section" id
            $("#article-section").append($articleList);
            var headline = article.headline.main;
            var $articleListItem = $("<li class='list-group-item articleHeadline'>");
            $articleListItem.append("<span class='label label-primary'>" + articleCount + "</span>" + "<strong> " + headline + "</strong>");

            if (byline && byline.original) {
            $articleListItem.append("<h5>" + byline.original + "</h5>");}
            $articleListItem.append("<h6>" + article.snippet + "</h6>");
            $articleListItem.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>");
            $articleList.append($articleListItem);
        }});

            // themoviedb API is being used here to get the year and then looking into the API so that we can find the top grossing movie and the poster of that movie. 
            var date = $("#date-input").val().trim();
            // using the slice function to take the date from YYYYMMDD into YYYY, MM, and DD. 
            var year = date.slice(0, 4)
            var month = date.slice(5, 7);
            console.log(month);
            var day = date.slice(8, 10);
            console.log(day);
            // throwing just the year variable into the queryURL
            var queryURL = "https://api.themoviedb.org/3/discover/movie?certification_country=US&primary_release_year="+year+"&sort_by=revenue.desc&api_key=51eb03086e20d27aa96dcce0ddf7d6a0";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
        for (var i = 0; i < 3; i++) {
          var posterURL = response.results[i].poster_path;
          var posterURLCount = i + 1;
          var posterImage = $("<img>");
          var posterImage2 = $("<img>");
          var posterImage3 = $("<img>");
          // Taking the poster from the queryURL and putting them onto the page
          posterImage.attr("src","https://image.tmdb.org/t/p/w500" +  posterURL );
          posterImage.attr("alt", "poster image");
          $("#poster").append(posterImage[0]);
          $("#poster2").append(posterImage2[1]);
          $("#poster3").append(posterImage3[2]);
        }


        // taking the movie names and giving them context on the html page. 
        var $movieList = $("<ul>");
        $("#movieOMDB-section").append($movieList);
        var $movieListItem = $("<li class='list-group-item movieResponse'>");

        $movieListItem.append("<p> The highest grossing movie on your birthday (" + date + ") was " + response.results[0].original_title + "</p>");
        $movieListItem.append("<p> The second highest grossing movie on your birthday (" + date + ") was " + response.results[1].original_title + "</p>");
        $movieListItem.append("<p> The third highest grossing movie on your birthday (" + date + ") was " + response.results[2].original_title + "</p>");
        $movieList.append($movieListItem);
            });

            // youtube API. we are taking the name of the user and using the youtubeAPI to get a happy birthday video from them if 'today' is their birthday.
            var name = $("#userName-input").val().trim();
            console.log (name);
            // using the name input to access the youtube API and get the specified channels video based on the input
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


          $("#financial-section").empty();
          // here we take OpenRates API and use it to give the user the currency valuations from their birth date.
          // Here we grab the text from the input box
          var userName = $("#userName-input").val();
          var birthLocation = $("#birth-location-input").val();
          var date = $("#date-input").val();

          var queryURL = "http://api.openrates.io/" + date;

          $.ajax({
            url: queryURL,
            method: "GET",
        }).done(function(response) {
            console.log(response);
            // taking the openrates API and getting the correct currency's form usa, great britain, and australia. 
            var currency = response.rates;
            // making a variable to create a list on the html.
            var $financialList = $("<ul>");

            var usCurrency = currency.USD;
            var britianCurrency = currency.GBP;
            var australianCurrency = currency.AUD;

            console.log("US Currency: " + usCurrency);
            console.log("Britian Currency: " + britianCurrency);
            console.log("Australian Currency: " + australianCurrency);
            // printing to the page
            $("#financial-section").append($financialList);
            var $financialListItem = $("<li class='list-group-item financialRate'>");

            $financialListItem.append("<p> The United States currency rate on your birthday (" + date + ") was " + usCurrency + "</p>");
            $financialListItem.append("<p> The Great Britian pound rate on your birthday (" + date + ") was " + britianCurrency + "</p>");
            $financialListItem.append("<p> The Australian dollar rate on your birthday (" + date + ") was " + australianCurrency + "</p>");
            $financialList.append($financialListItem);

          }).fail(function(error) {
            var $financialList = $("<ul>");
            $("#financial-section").append($financialList);
            var $financialListItem = $("<li class='list-group-item financialRate'>");
            $financialListItem.append("<p> You are too old to see any financial rates. Sorry..." + "</p>");
            $financialList.append($financialListItem);

            // Clearing out all of the text-boxes by setting the values to an empty string
            $("#userName-input").val("");
            $("#birth-location-input").val("");
            $("#date-input").val("");

          });
            });

  // Create Firebase event for adding train information to the Firebase database and a row in the html when a user adds a new train
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    // Console logging the information that was sent to the Firebase database, to verify that it is showing correctly
    console.log(childSnapshot.val());

    // Storing the above childSnapshot for each input in a new variable
    var nameOfUser = childSnapshot.val().userName;
    var birthLocation = childSnapshot.val().place;
    var birthDate = childSnapshot.val().dateOfBirth;

    // Console logging the train info that was generated from the above snapshot values
    console.log(nameOfUser);
    console.log(birthLocation);
    console.log(birthDate);

    // Adding the entered train data into the table
    $("#data-dump-table > tbody").append("<tr><td>" + nameOfUser + "</td><td>" + birthLocation + "</td><td>" + birthDate + "</td><td>");

// -----------------------------------------------------------------------------------
// END FIREBASE
// -----------------------------------------------------------------------------------

      });
