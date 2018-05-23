$(document).ready(function(){

  // Register User AJAX
  $('.signup').on('click', function(e){
    $target = $(e.target);
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var c_password = document.getElementById('c-password').value;

    $.ajax({
      type: 'POST',
      url: '/users/register',
      contentType: 'application/json', 
      data: JSON.stringify({
        'email': email,
        'password': password,
        'c_password': c_password
      }),
      success: function(response){
        console.log('Succeeded');  
      },
      error: function(err){
        console.log('ERRRRRORRRRR')
        console.log(err);     
      }
    });
  });

});