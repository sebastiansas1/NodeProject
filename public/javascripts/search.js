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

});