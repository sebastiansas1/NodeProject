$(document).ready(function() {
  // Create Review AJAX
  // $("#review_form").submit(function(e) {
  //   e.preventDefault();
  //   const restaurant_id = $(e.target).attr("data-id");
  //   var title = document.getElementById("title").value;
  //   var comment = document.getElementById("comment").value;
  //   var score = document.getElementById("score").value;
    
  //   $.ajax({
  //     type: "POST",
  //     url: "/restaurants/"+ restaurant_id +"/reviews/add",
  //     contentType: "application/json",
  //     data: JSON.stringify({
  //       title: title,
  //       comment: comment,
  //       score: score,
  //       restaurant_id: restaurant_id
  //     }),
  //     success: function(res) {
  //       alert(restaurant_id);
  //       // window.location.href = "/";
  //     },
  //     error: function(err) {
  //       console.log("Error");
  //       alert(err);
  //     }
  //   });
  // });
});