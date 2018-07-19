$("#submit").on("click", function(event){
    event.preventDefault();
    $("#financial-section").empty();

    // Here we grab the text from the input box
    var artist = $("#artist-input").val();
    var album = $("#album-input").val();
    var birthLocation = $("#birth-location-input").val();
    var date = $("#date-input").val();

    // Here we construct our URL - Utilize OpenRates API
    // var queryURL = "http://api.openrates.io/2000-01-03"
    // Be mindful of the dates entered. If the date is a holiday or a weekend, it will pull the data from the preceding business day
    var queryURL = "http://api.openrates.io/" + date;

    $.ajax({
      url: queryURL,
      method: "GET",
  }).done(function(response) {
      console.log(response);
      $("#financial-section").text(JSON.stringify(response));

      var currency = response.rates;
      var $financialList = $("<ul>");

      var usCurrency = currency.USD;
      var britianCurrency = currency.GBP;
      var australianCurrency = currency.GBP;

      console.log("US Currency: " + usCurrency);
      console.log("Britian Currency: " + britianCurrency);
      console.log("Australian Currency: " + australianCurrency);

      $("#financial-section").append($financialList);
      var $financialListItem = $("<li class='list-group-item financialRate'>");


      // $("#financial-section").text("The United States currency rate on " + date + " was " + usCurrency);
      // $("#financial-section").text("The Great Britian pound rate on " + date + " was " + britianCurrency);
      // $("#financial-section").text("The Australian dollar rate on " + date + " was " + australianCurrency);

      $financialListItem.append("The United States currency rate on " + date + " was " + usCurrency);
      $financialListItem.append("The Great Britian pound rate on " + date + " was " + britianCurrency);
      $financialListItem.append("The Australian dollar rate on " + date + " was " + australianCurrency);
      $financialList.append($financialListItem);


      });
});
