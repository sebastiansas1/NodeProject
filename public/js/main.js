$(document).ready(function(){
  console.log("document loaded");
  $('.delete-restaurant').on('click', function(e){
    window.console.log("delete button clicked");
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
    window.console.log("edit button clicked");
    $target = $(e.target);
    const id = $target.attr('data-id');
    var name = document.getElementById('name').value;
    console.log("name" + name);
    var cousine = document.getElementById('cousine').value;
    console.log("cousine" + cousine);
    var description = document.getElementById('description').value;
    console.log("description" + description);
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
        window.location.href='/';        
      },
      error: function(err){
        console.log(err);     
      }
    });
  });
});