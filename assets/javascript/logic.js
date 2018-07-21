// When the document loads, hide the confetti page, the message on the confetti page, and the button that takes the user back to the main page.
$(document).ready(function()
{
  $("#myBtn").hide();
  $("#confetti").hide();
  $("#message").hide();
});

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCxmvJ0x5c4sdzxyPsxehu4iPyC5L0OSOs",
  authDomain: "project-1-3ddd9.firebaseapp.com",
  databaseURL: "https://project-1-3ddd9.firebaseio.com",
  projectId: "project-1-3ddd9",
  storageBucket: "project-1-3ddd9.appspot.com",
  messagingSenderId: "225277028794"
};

// Adding firebase to javscript page
firebase.initializeApp(config);

// Creating a new variable called "database" that is assigned to the firebase database.
var database = firebase.database();

// On click function to accept data inputs from user
$("#submit").on("click", function(event)
{
    event.preventDefault();

    // COLLECTING INPUT FROM USER SECTION
    // Returning the current month according to local time and adding 1.
    var currentMonth = (new Date).getMonth() + 1;
    // Returning the day of the month for the specified date according to local time.
    var currentDay = (new Date).getDate();
    // Creating a new variable called "nameOfUser" and setting it to the user's name input.
    // Added trim to remove trailing spaces that may be collected in the input.
    var nameOfUser = $("#userName-input").val().trim();
    // Creating a new variable called "birthLocation" and setting it to the user's birth location input.
    // Added trim to remove trailing spaces that may be collected in the input.
    var birthLocation = $("#birth-location-input").val().trim();
    // Creating a new variable called "birthDate" and setting it to the user's birthday input.
    // Added trim to remove trailing spaces that may be collected in the input.
    var birthDate = $("#date-input").val().trim();
    // Creating a new variable called "dateInput" that splits on the "-" thus separating months from days.
    var dateInput = $("#date-input").val().split('-'),
    // This is parsing the string value entered by the user into an integer that corresponds to the month.
    dateMonth = parseInt(dateInput[1]),
    // This is parsing the string value entered by the user into an integer that corresponds to the day.
    dateDay = parseInt(dateInput[2]);

    // This if else statement serves as jquery hiding code - this hides and shows elements of the html based off birth month and birth day.
    if ((dateMonth == currentMonth) && (dateDay == currentDay))
    {
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
    }

    else
    {
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
    }

    // Creating a new local "temporary" object called "newItem" for that holds input data - for Firebase.
    var newItem =
    {
      userName: nameOfUser,
      place: birthLocation,
      dateOfBirth: birthDate,
    };

    // Uploading this "newItem" data to the Firebase database
    database.ref().push(newItem);

    // Logging user's inputs to the console - for testing
    // This could be uncommented, but it is good to keep so that it is easy to verify the behavior in both Firebase and the console.
    console.log(newItem.userName);
    console.log(newItem.place);
    console.log(newItem.dateOfBirth);

    // ------------------------------------------------------------------------------------------------------
    // NEW YORK TIMES API SECTION
    // This is the New York Times API code - this pulls the top articles based on the birth date input.
    // ------------------------------------------------------------------------------------------------------

    //Emptying out the section that will hold the article that get appended to the page.
    $("#article-section").empty();
    // Creating a new variable called "birthday" and setting it to the user's birthday input.
    var birthday = $("#date-input").val();
    // This is the URL that will be used for the NYT API ajax call.
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "c2a6882d365346fabaad70c46f8eb4bf",
      'begin_date': birthday,
      'end_date': birthday
    });
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result)
    {
      // Logging what we get from the API to the console.
      console.log(result);
      // Creating a for loop to cycle through the array five times (so that we can only get five results).
      for (var i = 0; i < 5; i++)
      {
        // Pulling the docs index and assigning it to a new variable called "article".
        var article = result.response.docs[i];
        // Incrementing the index by one and assigning it to a new variable called "articleCount".
        var articleCount = i + 1;
        // Taking the list items and using jQuery to put them into listed items.
        var $articleList = $("<ul>");
        // Putting the byline in a new variable called "byline".
        var byline = article.byline;
        // Appending the list into the html into the "article-section" id.
        $("#article-section").append($articleList);
        // Putting the main headline in a new variable called "headline".
        var headline = article.headline.main;
        // Using JQuery to create a new list item with a new class name as well, and assigning this to a variable called "$articleListItem".
        var $articleListItem = $("<li class='list-group-item articleHeadline'>");
        // Appending the articleCount and Headline to the label in the card.
        $articleListItem.append("<span class='label label-primary'>" + articleCount + "</span>" + "<strong> " + headline + "</strong>");
        // If the conditional logic is met, then the byline information will be appended to the h5 header.
        if (byline && byline.original)
        {
          $articleListItem.append("<h5>" + byline.original + "</h5>");
        }
        // Appending the snippet to the "h6" header tag
        $articleListItem.append("<h6>" + article.snippet + "</h6>");
        // Appending the web url to the "a href" tag
        $articleListItem.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>");
        // Appending all of these list items to the "$articleList"
        $articleList.append($articleListItem);
      }
    });

    // ------------------------------------------------------------------------------------------------------
    // OMDB API SECTION
    // The OMDB API is being used here to get the year and then looking into the API so that we
    // can find the top grossing movie and the poster of that movie.
    // ------------------------------------------------------------------------------------------------------

    // Creating a new variable called "date" and setting it to the user's birthday input.
    var date = $("#date-input").val().trim();
    // Using the slice function to take the date from YYYYMMDD into YYYY, MM, and DD.
    var year = date.slice(0, 4);
    var month = date.slice(5, 7);
    var day = date.slice(8, 10);
    // Logging the spliced month to the console.
    console.log(month);
    // Logging the spliced day to the console.
    console.log(day);
    // Throwing just the year variable into the queryURL
    var queryURL = "https://api.themoviedb.org/3/discover/movie?certification_country=US&primary_release_year="+year+"&sort_by=revenue.desc&api_key=51eb03086e20d27aa96dcce0ddf7d6a0";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response)
    {
      // Logging what we get from the API to the console.
      console.log(response);
      // Creating a for loop to cycle through the array three times (so that we can only get three results (movie titles and posters)).
      for (var i = 0; i < 3; i++)
      {
        // Pulling the poster path from the results index and assigning it to a new variable called "posterURL".
        var posterURL = response.results[i].poster_path;
        // Incrementing posterURLCount by 1.
        var posterURLCount = i + 1;
        // Using JQuery to create an empty "img" tag and assigning it to a new "posterImage" variable.
        var posterImage = $("<img>");
        // Using JQuery to create an empty "img" tag and assigning it to a new "posterImage2" variable.
        var posterImage2 = $("<img>");
        // Using JQuery to create an empty "img" tag and assigning it to a new "posterImage3" variable.
        var posterImage3 = $("<img>");
        // Taking the poster from the queryURL and putting it onto the page
        posterImage.attr("src","https://image.tmdb.org/t/p/w500" +  posterURL );
        // If the poster image doesn't show, we are giving an alt property that will display the text "poster image".
        posterImage.attr("alt", "poster image");
        // Appending the first poster to the "#poster" id which corresponds to the first index in the array.
        $("#poster").append(posterImage[0]);
        // Appending the second poster to the "#poster2" id which corresponds to the second index in the array.
        $("#poster2").append(posterImage2[1]);
        // Appending the third poster to the "#poster3" id which corresponds to the third index in the array.
        $("#poster3").append(posterImage3[2]);
      }
      // Taking the movie names and giving them context on the html page.
      var $movieList = $("<ul>");
      // Appending the list of movies, and dumping them into the "movieOMDB-section".
      $("#movieOMDB-section").append($movieList);
      // Using JQuery to create a new list item with a new class name as well, and assigning this to a variable called "$movieListItem".
      var $movieListItem = $("<li class='list-group-item movieResponse'>");
      // These three lines append the first, second, and third highest grossing movie titles to the main html page.
      $movieListItem.append("<p> The highest grossing movie on your birthday (" + date + ") was " + response.results[0].original_title + "</p>");
      $movieListItem.append("<p> The second highest grossing movie on your birthday (" + date + ") was " + response.results[1].original_title + "</p>");
      $movieListItem.append("<p> The third highest grossing movie on your birthday (" + date + ") was " + response.results[2].original_title + "</p>");
      // Appending all of these list items to the "$movieList"
      $movieList.append($movieListItem);
    });

    // --------------------------------------------------------------------------------------------------------------------------------------
    // YOUTUBE API SECTION
    // We are taking the name of the user and using the youtubeAPI to get a happy birthday video from them if 'today' is their birthday.
    // --------------------------------------------------------------------------------------------------------------------------------------

    // Creating a new variable called "name" and setting it to the user's name input.
    // Added trim to remove trailing spaces that may be collected in the input.
    var name = $("#userName-input").val().trim();
    // Console logging the name to the console for testing purposes.
    console.log (name);
    // using the name input to access the youtube API and get the specified channels video based on the input
    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCMAtGuHXZbuWCIu5qzoTMqg&q=" + name + "&key=AIzaSyDt345apnnfJAcLDzf1_Iw5gSb7cbT_zWw";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response)
    {
      // Logging what we get from the API to the console.
      console.log(response);
      // Logging the video id corresponding to the first index to the console.
      console.log(response.items[0].id.videoId);
      // Taking the video id corresponding to the first index and assigning to a new variable called "hbdVideo"
      hbdVideo = response.items[0].id.videoId;
      // Logging the newly created hbdVideo to the console.
      console.log(hbdVideo);
      // Concatenating hbdVideo to the Youtube URL and putting this in the "#video" id.
      $("#video").attr("src", "https://www.youtube.com/embed/"+hbdVideo);
    });

    // --------------------------------------------------------------------------------------------------------------------------------------
    // OPEN RATES API SECTION
    // We take OpenRates API and use it to give the user the currency valuations from their birth date.
    // --------------------------------------------------------------------------------------------------------------------------------------

    //Emptying out the section that will hold the financial rate information that will get appended to the page.
    $("#financial-section").empty();
    // The next three lines grab the text that the user inputs in the form.
    var userName = $("#userName-input").val();
    var birthLocation = $("#birth-location-input").val();
    var date = $("#date-input").val();
    // Throwing just the date variable into the queryURL
    var queryURL = "http://api.openrates.io/" + date;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).done(function(response) {
      // Logging what we get from the API to the console.
      console.log(response);


      // Taking the openrates API and getting the correct currency's form USA, Great Britain, and Australia.
      var currency = response.rates;
      //  Making a variable to create a list on the html.
      var $financialList = $("<ul>");
      // The following three new variables correspond to a type of currency from the OpenRatesAPI.
      var usCurrency = currency.USD;
      var britianCurrency = currency.GBP;
      var australianCurrency = currency.AUD;
      // Logging the above mentioned currencies to the console.
      console.log("US Currency: " + usCurrency);
      console.log("Britian Currency: " + britianCurrency);
      console.log("Australian Currency: " + australianCurrency);
      // Printing the financial information to the page
      $("#financial-section").append($financialList);
      var $financialListItem = $("<li class='list-group-item financialRate'>");
      $financialListItem.append("<p> The United States currency rate on your birthday (" + date + ") was " + usCurrency + "</p>");
      $financialListItem.append("<p> The Great Britian pound rate on your birthday (" + date + ") was " + britianCurrency + "</p>");
      $financialListItem.append("<p> The Australian dollar rate on your birthday (" + date + ") was " + australianCurrency + "</p>");
      $financialList.append($financialListItem);

    // If the age is too old, the following will trigger an error on the html page, informing the user that they are too old to view the data.
    }).fail(function(error)
    {
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
  // Closing braces & parentheses for the On Click Function (starting on line 26).
  });

  // Create Firebase event for adding train information to the Firebase database and a row in the html when a user adds a new train
  database.ref().on("child_added", function(childSnapshot, prevChildKey)
  {

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
  // Closing braces & parentheses for for Firebase.
  });
