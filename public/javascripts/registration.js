$(document).ready(function() {
  // Password field focus in event
  $("#password").on("focusin", function(event) {
    var password_dropdown = $("#password-dropdown");
    password_dropdown.height(200);
    password_dropdown.css("max-height", "200px");
    password_dropdown.css("padding-top", "20px");
    password_dropdown.css("border-color", "lightgray");
    $(this).css("border", "1px solid #7a2def");
    $(this).css("border-radius", "5px 5px 0px 0px");
    $(this).css("border-bottom", "1px solid lightgray");
    $("#password-dropdown").css("border", "1px solid #7a2def");
    $("#password-dropdown").css("border-top", "1px solid transparent");
  });

  // Password field focus out event
  $("#password").on("focusout", function(event) {
    var password_dropdown = $("#password-dropdown");
    password_dropdown.height(0);
    password_dropdown.css("padding-top", "0px");
    password_dropdown.css("max-height", "0px");
    password_dropdown.css("border-color", "transparent");
    $(this).css("border", "1px solid lightgray");
    $(this).css("border-radius", "5px");
    validatePassword($(this).val(), $("#c-password").val());
    $("#password-dropdown").css("border", "1px solid transparent");
  });

  // Password validation on each key strike
  $("#password").on("keyup", function(event) {
    var pass = $(this).val();

    // At least 1 uppercase letter
    if (pass.match(/.*[A-Z]/)) {
      $("#password-condition-uppercase").css("color", "#00bf93");
    } else {
      $("#password-condition-uppercase").css("color", "gray");
    }

    // At least 1 lowercase letter
    if (pass.match(/.*[a-z]/)) {
      $("#password-condition-lowercase").css("color", "#00bf93");
    } else {
      $("#password-condition-lowercase").css("color", "gray");
    }

    // At least 1 digit
    if (pass.match(/.*\d/)) {
      $("#password-condition-digit").css("color", "#00bf93");
    } else {
      $("#password-condition-digit").css("color", "gray");
    }

    // At least 1 special character
    if (pass.match(/.*[_\W]/)) {
      $("#password-condition-special").css("color", "#00bf93");
    } else {
      $("#password-condition-special").css("color", "gray");
    }

    // At least 8 characters in length
    if (pass.length > 7) {
      $("#password-condition-length").css("color", "#00bf93");
    } else {
      $("#password-condition-length").css("color", "gray");
    }

    validatePassword($(this).val(), $("#c-password").val());
  });

  // Email validation on each key strike
  $("#email").on("keyup", function(event) {
    validateEmail($("#email").val());
  });

  // Password confirm validation on each key strike
  $("#c-password").on("keyup", function(event) {
    validatePassword($("#password").val(), $(this).val());
    $("#password-dropdown").css("border", "1px solid transparent");
  });

  // On signup form submitted event
  $("#signup_form").submit(function(event) {
    // Prevent default action for form
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var c_password = document.getElementById("c-password").value;
    var valid_email = validateEmail(email);
    var valid_password = validatePassword(password, c_password);

    // Validate all form fields before submitting data from form
    if (valid_email == true && valid_password == true) {
      // All fields are valid. AJAX action to be submitted
      $.ajax({
        type: "POST",
        url: "/users/register",
        contentType: "application/json",
        data: JSON.stringify({
          email: email,
          password: password,
          c_password: c_password
        }),
        // Valid form field values on serverside
        success: function(res) {
          window.location.href = "/";
        },
        // Invalid form field values on serverside
        error: function(err) {
          var error = err.responseText;
          if (error == "DB_DUPLICATE_KEY") {
            // Duplicate email, account probably exists
            $(".flash-box").text("Account already exists with email: " + email);
            $("#flash-message").css("visibility", "visible");
            $("#email").css("border", "1px solid #e01f3e");
          } else {
            // Unknown errors will be displayed on a JavaScript
            alert("Error: " + error);
          }
        }
      });
    }
    // Invalid email format or missing
    else if (valid_email != true) {
      console.log("Got inside validation -- Invalid email");
      $(".flash-box").text(valid_email);
      $("#flash-message").css("visibility", "visible");
      $("#email").css("border", "1px solid #e01f3e");
    }
    // Invalid password format or missing
    else if (valid_password != true) {
      console.log("Got inside validation -- Invalid password");
      $(".flash-box").text(valid_password);
      $("#flash-message").css("visibility", "visible");
      $("#password").css("border", "1px solid #e01f3e");
      $("#c-password").css("border", "1px solid #e01f3e");
    } else {
      alert("SERVER ERROR - UNKNOWN");
    }
  });

  $("#password").on("focus", function(event) {
    $("#password-dropdown").css("visibility");
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
        $("#email").css("border", "1px solid #00bf93");
        return true;
      } else {
        // Email missing . char
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

function validatePassword(password, c_password) {
  // Check if password is empty or not
  if (password) {
    var validFormat = true;

    $(".password-condition").each(function() {
      if ($(this).css("color") != "rgb(0, 191, 147)") {
        validFormat = false;
      }
    });

    if (validFormat) {
      // Valid password format
      $("#password").css("border", "1px solid #00bf93");
      $("#password-dropdown").css("border", "1px solid #00bf93");
      $("#password-dropdown").css("border-top", "1px solid transparent");
      if (password == c_password) {
        // Passwords match
        $("#flash-message").css("visibility", "hidden");
        $("#c-password").css("border", "1px solid #00bf93");
        return true;
      } else {
        $("#c-password").css("border", "1px solid lightgray");
        return "Password and confirmation password must match";
      }
    } else {
      return "Password format must fullfil criteria";
    }
  } else {
    // Password is empty
    return "Password field is required";
  }
}
