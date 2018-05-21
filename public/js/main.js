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
});