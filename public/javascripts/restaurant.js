$(document).ready(function(){

  // Create Restaurant AJAX
  $('.create-restaurant').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    var name = document.getElementById('name').value;
    var cousine = document.getElementById('cousine').value;
    var description = document.getElementById('description').value;
    $.ajax({
      type: 'POST',
      url: '/restaurants/add',
      data: {
        'name': name,
        'description': description,
        'cousine': cousine
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
    var cousine = document.getElementById('cousine').value;
    var description = document.getElementById('description').value;
    $.ajax({
      type: 'POST',
      url: '/restaurants/edit/'+id,
      data: {
        'name': name,
        'description': description,
        'cousine': cousine
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
});