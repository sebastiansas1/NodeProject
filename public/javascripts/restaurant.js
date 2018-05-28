$(document).ready(function() {
  // Create Restaurant AJAX
  $(".create-restaurant").on("click", function(e) {
    $target = $(e.target);
    const id = $target.attr("data-id");
    var name = document.getElementById("name").value;
    var addressLine1 = document.getElementById("addressLine1").value;
    var addressLine2 = document.getElementById("addressLine2").value;
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
        addressLine1: addressLine1,
        addressLine2: addressLine2,
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
        console.log("Success");
        // window.location.href = "/";
      },
      error: function(err) {
        console.log("Error");
        console.log(err);
      }
    });
  });

  // Edit Restaurant AJAX
  $(".edit-restaurant").on("click", function(e) {
    $target = $(e.target);
    const id = $target.attr("data-id");
    var name = document.getElementById("name").value;
    var addressLine1 = document.getElementById("addressLine1").value;
    var addressLine2 = document.getElementById("addressLine2").value;
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
        addressLine1: addressLine1,
        addressLine2: addressLine2,
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
        console.log("Successs");
        window.location.href = "/restaurants/" + id;
      },
      error: function(err) {
        console.log("Error");
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

  // //Display the restaurant image
  // $(function() {
  //   var images = document.getElementsByClassName('resturant-image');
  //   for(var i = 0 ; i<images.length; i++){      
  //     var name = images[i].getAttribute("name");
  //     var elem = document.createElement("img");
  //       elem.setAttribute("class", "restaurant-pic") 
  //       elem.setAttribute("name", name); 
  //       elem.setAttribute("src", "/" +images[i].id.split('/')[2])     
  //       elem.setAttribute("height", "200");
  //       elem.setAttribute("width", "250");
  //       elem.setAttribute("alt", "Restaurant Image");
  //       images[i].appendChild(elem);
  //   }
  // });
});
