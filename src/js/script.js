$(document).ready(function() {

  // URL Form submission.
  $('#form').on('submit', function(e) {

    // Prevent default action.
    e.preventDefault();

    // Get the URL entered by the user.
    var url = $('#input-url').val();

    // Make an ajax request to the server
    // at the /new endpoint.
    var jqxhr = $.getJSON('/new/' + url);

    jqxhr.done(function() {
      console.log(jqxhr);
    })

    jqxhr.always(function() {
      console.log('always')
    })


    jqxhr.fail(function(e) {
      console.log(e)
    });

  });


});
