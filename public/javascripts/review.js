$(document).ready(function() {
  //Create Review AJAX
  $("#review_form").submit(function(e) {
    e.preventDefault();
   

    var title = document.getElementById("title").value;
    var comment = document.getElementById("comment").value;
    var stars = document.getElementById("stars").value;

    var formData = new FormData(this);
    console.log("form data" + formData);
    formData.append('title', title);
    formData.append('comment', comment);
    formData.append('stars', stars);
    formData.append('restaurant_id', restaurant_id);

    console.log("loc = "  + window.location.href);
    var fullUrl = window.location.href;
    var restaurant_id = fullUrl.split('/')[4];
    console.log("rest id " + restaurant_id);


    // Display the key/value pairs
    for (var pair of formData.entries())
    {
      console.log(pair[0]+ ', '+ pair[1]); 
    }

    
    $.ajax({
      type: "POST",
      url: "/restaurants/"+ restaurant_id +"/reviews/add",
      contentType: "application/json",
      // data: JSON.stringify({
      //   title: title,
      //   comment: comment,
      //   stars: stars,
      //   restaurant_id: restaurant_id
      // }),
      data: formData,
      success: function(res) {
        alert(restaurant_id);
        window.location.href = "/restaurants/"+restaurant_id;
      },
      error: function(err) {
        console.log("Error");
        alert(err);
      },
      cache: false,
      contentType: false,
      processData: false
    });
  });

  $(".delete-review").on("click", function (e) {
    console.log("delete review button clicked ");
    $target = $(e.target);

    var review_id = $target.attr("name");
    var restaurant_id = $target.attr("restaurant_id");
    window.console.log("restaurant iD " + restaurant_id);

    window.console.log("review_id = " + review_id);

    $.ajax({
      type: "POST",
      url: "/restaurants/"+ restaurant_id +"/reviews/remove/" + review_id,
      data: review_id,
      success: function (res) {
        console.log("Successs");
        window.location.href = "/restaurants/" + restaurant_id;
      },
      error: function (err) {
        console.log("Error");
        console.log(err);
      }
    });
  });

  $(".btn-review").hover(function (e) {
    $(this).prev().css("filter", "blur(1px)");
  });

  $(".delete-review").hover(function (e) {
    $(this).parent().prev().css("filter", "blur(1px)");
  });

  $(".btn-review").mouseout(function (e) {
    $(this).prev().css("filter", "blur(0px)");
  });
});