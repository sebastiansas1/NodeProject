function isValid(field) {
  if(field != "") return true;
  else return false;
}

function validate(field) {
  if (isValid(field)) {

  }
  else {

  }
}

$(document).ready(function() {
  // Create Restaurant AJAX
  $(".create-form").on("submit", function(e) {
    e.preventDefault();
    var name = document.getElementById("name").value;
    var nr = document.getElementById("nr").value;
    var street = document.getElementById("street").value;
    var city = document.getElementById("city").value;
    var county = document.getElementById("county").value;
    var country = document.getElementById("country").value;
    var postcode = document.getElementById("postcode").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var website = document.getElementById("website").value;
    var cuisine = document.getElementById("cuisine").value;
    var description = document.getElementById("description").value;



    $.ajax({
      type: "POST",
      url: "/restaurants/add",
      contentType: "application/json",
      data: JSON.stringify({
        name: name,
        nr: nr,
        street: street,
        city: city,
        county: county,
        country: country,
        postcode: postcode,
        phoneNumber: phoneNumber,
        website: website,
        cuisine: cuisine,
        description: description
      }),
      success: function(res) {
        if (res.result == 'redirect') {
          window.location.replace(res.url);
        } else {
          window.location.replace('/restaurants/add');
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  // Edit Restaurant AJAX
  $(".edit-restaurant").on("click", function(e) {
    e.preventDefault();
    $target = $(e.target);
    const id = $target.attr("data-id");
    var name = document.getElementById("name").value;
    var nr = document.getElementById("nr").value;
    var street = document.getElementById("street").value;
    var city = document.getElementById("city").value;
    var county = document.getElementById("county").value;
    var country = document.getElementById("country").value;
    var postcode = document.getElementById("postcode").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var website = document.getElementById("website").value;
    var cuisine = document.getElementById("cuisine").value;
    var description = document.getElementById("description").value;
    $.ajax({
      type: "POST",
      url: "/restaurants/"+id+"/edit",
      contentType: "application/json",
      data: JSON.stringify({
        name: name,
        nr: nr,
        street: street,
        city: city,
        county: county,
        country: country,
        postcode: postcode,
        phoneNumber: phoneNumber,
        website: website,
        cuisine: cuisine,
        description: description
      }),
      success: function(res) {
        if (res.result == 'redirect') {
          window.location.replace(res.url);
        } else {
          window.location.replace('/restaurants/'+id+"/edit");
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  // Delete Restaurant AJAX
  $(".delete-restaurant").on("click", function(e) {
    $target = $(e.target);
    const id = $target.attr("data-id");
    var confirmation = confirm("Are you sure you want to delete?");
    if (confirmation) {
      $.ajax({
        type: "DELETE",
        url: "/restaurants/" + id,
        success: function(res) {
          console.log("Successs");
          window.location.href = "/";
        },
        error: function(err) {
          console.log("Error");
          console.log(err);
        }
      });
    }
  });
});
