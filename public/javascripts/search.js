$(document).ready(function() {
  // Search Restaurant AJAX
  $(".btn-search1").on("click", function(event) {
    var search_query = document.getElementById("form-search1").value;
    $.ajax({
      type: "GET",
      url: "/",
      success: function(res) {
        window.location.href = "/search/" + search_query;
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  $("#form-search1").keyup(function(e) {
    if (e.keyCode == 13) {
      $(".btn-search1").click();
    }
  });

  //Autocomplete
  $("#form-search1")
    .autocomplete({
      source: function(req, res) {

        $.ajax({
          url: "/autocomplete/" + req.term,
          type: "GET",
          success: function(data) {
            // Map res values to fiedl label and value
            res(
              $.map(data, function(item) {
                return {
                  label: item.name,
                  value: item.name
                };
                
              })
            );
          },
          error: function(xhr) {
            alert(
              xhr.status + " : " + xhr.statusText + " search term: " + req.term
            );
          }
        });
      },

      // The minimum number of characters a user must type before a search is performed.
      minLength: 1,

      // set an onFocus event to show the result on input field when result is focused
      focus: function(event, ui) {
        this.value = ui.item.label;
        // Prevent other event from not being execute
        event.preventDefault();
      },
      select: function(event, ui) {
        // Prevent value from being put in the input:
        this.value = ui.item.label;
        // Set the id to the next input hidden field
        $(this)
          .next("input")
          .val(ui.item.value);
        // Prevent other event from not being executed
        event.preventDefault();
        // $('.btn-search1').trigger('click');
        $.ajax({
          url: "/restaurants/search_query/" + ui.item.value,
          type: "GET",
          success: function(res) {
            // Map res values to field label and value
            window.location.href = "/restaurants/search_query/" + ui.item.value;
          },
          error: function(err) {
            alert("Got to sleep");
          }
        });
      },
      create: function(){
        $(this).data("ui-autocomplete")._renderItem = function(ul, item) {
          return $("<li>")
            .data("ui-autocomplete-item", item)
            .append(
              '<a><i class="fas fa-utensils ui-icon" style="align: middle;"> </i> ' +
                item.label +
                "</a>"
            )
            .appendTo(ul);
        };
      }

    })
    
});
