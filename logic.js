$("#submit").on("click", function(event){
    event.preventDefault();
    var birthday = $("#bday").val();
    console.log(birthday);
    $("#bday").val("");
    return false;
});
