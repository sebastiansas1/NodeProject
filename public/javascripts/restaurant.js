$(document).ready(function(){

  // Create Restaurant AJAX
  $('.create-restaurant').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    var name = document.getElementById('name').value;
    var addressLine1 = document.getElementById('addressLine1').value;
    var addressLine2 = document.getElementById('addressLine2').value;
    var city = document.getElementById('city').value;
    var county = document.getElementById('county').value;
    var country = document.getElementById('country').value;
    var postcode = document.getElementById('postcode').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var website = document.getElementById('website').value;
    var cuisine = document.getElementById('cuisine').value;
    var description = document.getElementById('description').value;
    $.ajax({
      type: 'POST',
      url: '/restaurants/add',
      data: {
        'name': name,
        'addressLine1': addressLine1,
        'addressLine2': addressLine2,
        'city': city,
        'county': county,
        'country': country,
        'postcode': postcode,
        'phoneNumber': phoneNumber,
        'website': website, 
        'cuisine': cuisine,
        'description': description
      },
      success: function(response){
        console.log(response);
        window.location.href='/';   
      },
      error: function(err){
        console.log(err);     
      }
    });
  });

  // Edit Restaurant AJAX
  $('.edit-restaurant').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    var name = document.getElementById('name').value;
    var addressLine1 = document.getElementById('addressLine1').value;
    var addressLine2 = document.getElementById('addressLine2').value;
    var city = document.getElementById('city').value;
    var county = document.getElementById('county').value;
    var country = document.getElementById('country').value;
    var postcode = document.getElementById('postcode').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var website = document.getElementById('website').value;
    var cuisine = document.getElementById('cuisine').value;
    var description = document.getElementById('description').value;
    $.ajax({
      type: 'POST',
      url: '/restaurants/edit/'+id,
      data: {
        'name': name,
        'addressLine1': addressLine1,
        'addressLine2': addressLine2,
        'city': city,
        'county': county,
        'country': country,
        'postcode': postcode,
        'phoneNumber': phoneNumber,
        'website': website, 
        'cuisine': cuisine,
        'description': description
      },
      success: function(response){
        console.log(response);
        window.location.href='/restaurants/'+id;        
      },
      error: function(err){
        console.log(err);     
      }
    });
  });

  // Delete Restaurant AJAX
  $('.delete-restaurant').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    var confirmation = confirm("Are you sure you want to delete?");
    if (confirmation) {
      $.ajax({
        type: 'DELETE',
        url: '/restaurants/'+id,
        success: function(response){
          window.location.href='/';
        },
        error: function(err){
          console.log(err);
        }
      });
    }
  });

   // Delete Restaurant AJAX
   $('.btn-search1').on('click', function(e){
    window.console.log("search button clicked");  
    $target = $(e.target);
    var search_form1 = document.getElementById('search-form1').value;
    window.console.log("search = " + search_form1); 
    $.ajax({
      type: 'GET',
      url: '/',
      data: {
        'search_form1': search_form1
      },
      success: function(response){
        console.log(response);
        window.location.href='/search/'+search_form1;        
      },
      error: function(err){
        console.log(err);     
      }
    });
  });
});