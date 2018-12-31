
function updateHandler() {
  $('.update').each(function() {
    $(this).click(function() {
      let post = $(this).closest('.post');
      let id = post.attr('data-id');
      let body = $('.post-body', post).text();
      let name = $('.author', post).text();
      console.log('click', id, body, name);

      $('.update-form [name="postbody"]').val(body);
      $('.update-form [name="name"]').val(name);
      $('.update-form [name="id"]').val(id);
    });
  });
}

updateHandler();
