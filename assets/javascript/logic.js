$("#submit").on("click", function(event){
    event.preventDefault();
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
            var $articleList = $("<ul>");
            var byline = article.byline;
            $("#article-section").append($articleList);
            var headline = article.headline.main;
            var $articleListItem = $("<li class='list-group-item articleHeadline'>");
              $articleListItem.append(
                "<span class='label label-primary'>" +
                  articleCount +
                  "</span>" +
                  "<strong> " +
                  headline +
                  "</strong>");
            if (byline && byline.original) {
            $articleListItem.append("<h5>" + byline.original + "</h5>");}
            $articleListItem.append("<h6>" + article.snippet + "</h6>");
            $articleListItem.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>");
            $articleList.append($articleListItem);
        }});
          });






              var modal = document.getElementById('myModal');

              // Get the button that opens the modal
              var btn = document.getElementById("myBtn");

              // Get the <span> element that closes the modal
              var span = document.getElementsByClassName("close")[0];

              // When the user clicks on the button, open the modal
              btn.onclick = function() {
                  modal.style.display = "block";
              };

              // When the user clicks on <span> (x), close the modal
              span.onclick = function() {
                  modal.style.display = "none";
              };

              // When the user clicks anywhere outside of the modal, close it
              window.onclick = function(event) {
                  if (event.target == modal) {
                      modal.style.display = "none";
                  }
              };
