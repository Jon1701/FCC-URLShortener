$(document).ready(function() {

  // Select input box contents on click.
  $('#field_short_url').on('focus', function(e) {

    // Prevent default action.
    e.preventDefault;

    $(this).select();

  });

  // URL Form submission.
  $('#form').on('submit', function(e) {

    // Prevent default action.
    e.preventDefault();

    // Get the URL entered by the user.
    var url = $('#input-url').val();

    // Make an ajax request to the server
    // at the /new endpoint.
    var jqxhr = $.getJSON('/new/' + url);

    // Once the request is done, parse the response.
    jqxhr.done(function(response) {

      // Check to see if the response from the server returned some kind of
      // error.
      if (response.hasOwnProperty('error')) {

        // If an error occured, display an error message to the user.
        var msg = response['error']['msg'];

        // Send error message to modal.
        $('#modal-error .message').text(msg);

        // Open the modal dialog.
        $('#modal-error').openModal();

      } else {

        // Obtain the short URL.
        var shortUrl = response['short_url'];

        // Send short URL to modal.
        $('#modal-success #field_short_url').val(shortUrl);

        // Open the modal dialog.
        $('#modal-success').openModal();

      }

    });

  });


});
