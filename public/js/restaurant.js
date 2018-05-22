$(document).ready(function(){
  $('.delete-restaurant').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/restaurant/'+id,
      success: function(response){
        alert('Deleting Restaurant');
        window.location.href='/';
      },
      error: function(err){
        console.log(err);
      }
    });
  });

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
        window.location.href='/restaurant/'+id;        
      },
      error: function(err){
        console.log(err);     
      }
    });
  });

  $('.create-restaurant').on('click', function(e){
    $target = $(e.target);
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
});