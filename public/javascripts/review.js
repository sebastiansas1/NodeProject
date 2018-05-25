$(document).ready(function() {
  //Create Review AJAX
  $("#review_form").submit(function(e) {
    e.preventDefault();

    var title = document.getElementById("title").value;
    var comment = document.getElementById("comment").value;
    var stars = document.getElementById("stars").value;

    console.log("loc = "  + window.location.href);
    var fullUrl = window.location.href;
    var restaurant_id = fullUrl.split('/')[4];
    console.log("rest id " + restaurant_id);
    
    $.ajax({
      type: "POST",
      url: "/restaurants/"+ restaurant_id +"/reviews/add",
      contentType: "application/json",
      data: JSON.stringify({
        title: title,
        comment: comment,
        stars: stars,
        restaurant_id: restaurant_id
      }),
      success: function(res) {
        alert(restaurant_id);
        window.location.href = "/restaurants/"+restaurant_id;
      },
      error: function(err) {
        console.log("Error");
        alert(err);
      }
    });
  });
});