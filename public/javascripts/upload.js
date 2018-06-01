$(document).ready(function () {
  // Upload Form AJAX
  $("form#upload_form").submit(function (e) {
    e.preventDefault();
    var full = window.location.href;
    var restaurant_id = full.split('/')[4];
    var formData = new FormData(this);

    $.ajax({
      type: "POST",
      url: "/restaurants/" + restaurant_id + "/upload",
      contentType: "application/json",
      data: formData,
      success: function (res) {
        console.log('Successful Upload');
        window.location.href = "/restaurants/" + restaurant_id + "/upload";
      },
      error: function (err) {
        console.log("Error");
        $("#upload-photo").css("color", "white");
        $("#upload-photo").css("background-color", "red");
        $("#upload-photo").css("border", "1px solid red");
        $("#upload-photo").attr("value", "Please Select A Picture To Upload");
      },
      cache: false,
      contentType: false,
      processData: false
    });
  });

  $(".delete-icon").on("click", function (e) {

    $target = $(e.target);
    const id = $target.attr("data-id");
    const id2 = id.split('/')[2];

    var name = $target.attr("name");

    window.console.log("name = " + name);

    var parameter = id2 + "_" + name;
    window.console.log("param = " + parameter);

    window.console.log("id2=" + id2);
    window.console.log("delete this image " + id);
    $.ajax({
      type: "POST",
      url: "/restaurants/" + name + "/upload/delete/" + parameter,
      data: parameter,
      success: function (res) {
        console.log("Successs");
        window.location.href = "/restaurants/" + name + "/upload";
      },
      error: function (err) {
        console.log("Error");
        console.log(err);
      }
    });
  });


  $(".picture").each(function() {
    $(this).prev().css("height", $(this).height());
    $(this).prev().css("width", $(this).width());
  });

  $(".btn-delete-picture").each(function() {

    $(this).mouseenter(function() {
      $(this).next().css("filter", "blur(2px) brightness(50%)");
      $(this).children().css("color", "white");
      $(this).children().mouseenter(function() {
        $(this).parent().trigger('mouseenter');
      });
    });

    $(this).mouseout(function() {
      $(this).next().css("filter", "blur(0px) brightness(100%)");
      $(this).children().css("color", "transparent");
      $(this).children().mouseout(function() {
        $(this).parent().trigger('mouseenter');
      });
    });
  });

  $("input:file").change(function () {
    var fileName = $(this).val();
    $(".filename").html(fileName);
    $(".upload-message").text("Ready To Upload ");
    $("#upload-photo").attr("value", fileName.split("\\")[2]);
    $("#upload-photo").prop('disabled', false);
    $("#upload-photo").css('cursor', "pointer");
    $("#upload-photo").css('color', "black");
    $(".upload-message").css('color', "white");
    $(".btn.btn-purple-upload-mini").css('cursor', "initial");
  });

});