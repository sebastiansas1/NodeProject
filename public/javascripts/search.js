$(document).ready(function(){
  // Search Restaurant AJAX
  $('.btn-search1').on('click', function(e){
    window.console.log("search button clicked");  
    $target = $(e.target);
    var search_query = document.getElementById('form-search1').value;
    window.console.log("search = " + search_query); 
    $.ajax({
      type: 'GET',
      url: '/',
      data: {
        'search_query': search_query
      },
      success: function(response){
        console.log(response);
        window.location.href='/search/'+search_query;        
      },
      error: function(err){
        console.log(err);     
      }
    });
  });

  $('#form-search1').keyup(function(e){
      if(e.keyCode == 13)
      {
        $('.btn-search1').click();
      }
  });

  //Autocomplete
  $('#form-search1').autocomplete({
    source: function (req, res) {
       $.ajax({
          url: '/autocomplete/'+req.term,
          type: 'GET',
          dataType: 'jsonp',
          data: {
            term: req.term
          },  // request is the value of search input
            success: function (data) {
              // Map res values to fiedl label and value
              res($.map(data, function (item) {
                  return {
                    label: item.name,
                    value: item.name
                  };
                }));
              },
            error: function(xhr){
              alert(xhr.status + ' : ' + xhr.statusText + ' search term: ' + req.term);
            }
          });
       },
       
       // The minimum number of characters a user must type before a search is performed.
       minLength: 3, 
       
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
          $(this).next("input").val(ui.item.value); 
          // Prevent other event from not being execute            
          event.preventDefault();
       
       }
  });
});