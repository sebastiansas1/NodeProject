$(document).ready(function() {

  // Email validation on each key strike
  $("#email").on("keyup", function(event) {
    validateEmail($("#email").val());
  });

  // Password confirm validation on each key strike
  $("#password").on("keyup", function(event) {
    validatePassword($(this).val(), $('#c-password').val());
  });

  // On login form submitted event
  $("#login_form").submit(function(event) {
    // Prevent default action for form
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var valid_email = validateEmail(email);
    var valid_password = validatePassword(password);

    // Validate all form fields before submitting data from form
    if (valid_email == true && valid_password == true) {
      // All fields are valid. AJAX action to be submitted
      $.ajax({
        type: "POST",
        url: "/users/login",
        contentType: "application/json",
        data: JSON.stringify({
          email: email,
          password: password
        }),
        // Valid form field values on serverside
        success: function(res) {
          if (res.result == 'redirect') {
            window.location.replace(res.url);
          } else {
            window.location.replace('/users/login');
          }
        },
        // Invalid form field values on serverside
        error: function(err) {
          console.log(err);
        }
      });
    }
    // Invalid email format or missing
    else if (valid_email != true) {
      $(".flash-box").text(valid_email);
      $("#flash-message").css("visibility", "visible");
      $("#email").css("border", "1px solid #e01f3e");
    }
    // Invalid password format or missing
    else if (valid_password != true) {
      $(".flash-box").text(valid_password);
      $("#flash-message").css("visibility", "visible");
      $("#password").css("border", "1px solid #e01f3e");
      $("#c-password").css("border", "1px solid #e01f3e");
    } else {
      alert("SERVER ERROR - UNKNOWN");
    }
  });

});

function validateEmail(email) {
  // Check if email is empty or not
  if (email) {
    // Check if email contains @ char
    if (email.includes("@")) {
      // Check if email contains . char
      if (email.includes(".")) {
        $("#flash-message").css("visibility", "hidden");
        $("#email").css("border", "1px solid green");
        return true;
      } else {
        // Email missing . char
        $("#flash-message").css("visibility", "visible");
        return 'Email format invalid: should contain "." after "@" symbol';
      }
    } else {
      // Email missing @ char
      return 'Email format invalid: should contain "@" symbol';
    }
  } else {
    // Email is empty
    return "Email field is required";
  }
}

function validatePassword(password) {
  // Check if password is empty or not
  if (password) {
    // Password exists
    return true;
  } else {
    // Password is empty
    return "Password field is required";
  }
}
