$(document).ready(function() {

  $('#star').raty({ path: '/static/bower_components/raty/lib/images'});

  $("#review_form").submit(function(e) {
    e.preventDefault();

    var title = document.getElementById("title").value;
    var comment = document.getElementById("comment").value;
    var stars = $('#star').raty('score');
    var restaurant_id = window.location.href.split('/')[4];
    var user_id = document.cookie.split('=')[1].split(';')[0];
    var user_name = document.cookie.split('=')[2].split(';')[0];

    var formData = new FormData(this);
    formData.append('title', title);
    formData.append('comment', comment);
    formData.append('stars', stars);
    formData.append('restaurant_id', restaurant_id);
    formData.append('user_id', user_id);
    formData.append('user_name', user_name);

    // Display the key/value pairs
    for (var pair of formData.entries())
    {
      console.log(pair[0]+ ', '+ pair[1]); 
    }
  
    $.ajax({
      type: "POST",
      url: "/restaurants/"+ restaurant_id +"/reviews/add",
      contentType: "application/json",
      data: formData,
      success: function(res) {
        window.location.href = "/restaurants/"+restaurant_id;
      },
      error: function(err) {
        console.log(err);
      },
      cache: false,
      contentType: false,
      processData: false
    });
  });

  $('.delete-review').each(function() {
    if($(this).attr('user_id') != document.cookie.split('=')[1].split(';')[0]) {
      $(this).hide();
      $(this).parent().hide();
    }
  });

  $(".delete-review").on("click", function (e) {
    $target = $(e.target);

    var review_id = $target.attr("name");
    var restaurant_id = $target.attr("restaurant_id");

    $.ajax({
      type: "POST",
      url: "/restaurants/"+ restaurant_id +"/reviews/remove/" + review_id,
      data: review_id,
      success: function (res) {
        window.location.href = "/restaurants/" + restaurant_id;
      },
      error: function (err) {
        console.log(err);
      }
    });
  });

});
