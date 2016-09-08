$(document).ready(function() {

  // Get the hostname of the request, the API usage URL, and example usage
  // and display it under the API USAGE tab.
  var jqxhrGetHostname = $.getJSON('/hostname');
  jqxhrGetHostname.success(function(response) {

    // Get the hostname of the request.
    var hostname = response;

    // API usage URl
    var apiUsageUrl = response + '/new/<URL to be shortened>';

    // Display API Usage URL in the input box.
    var $apiUrl = $('#input-apiurl');
    $apiUrl.val(apiUsageUrl);
    $apiUrl.attr('placeholder', apiUsageUrl);

    // Highlight text on focus.
    $apiUrl.on('focus', function(e) {
      $(this).select();
    });

    // Display an example for using the API endpoint.
    var exampleUrl = '/new/https://www.google.com';
    var jqxhrExample = $.getJSON(exampleUrl);
    jqxhrExample.success(function(response) {

      // Display Example API URL.
      $('#example-apiurl').text(hostname + exampleUrl);

      // Dislpay Example API Response.
      $('#example-apiresponse').text(JSON.stringify(response, null, 2));

      // Unhide Example.
      if (!response.hasOwnProperty('error')) {
        $('#container-example').removeClass('hidden');
      }

    });

  });

  // Select input box contents on click.
  $('#field_short_url').on('focus', function(e) {

    // Prevent default action.
    e.preventDefault;

    // Select all contents.
    $(this).select();

  });

  // URL Form submission.
  $('#form').on('submit', function(e) {

    // Prevent default action.
    e.preventDefault();

    // Get the URL entered by the user, and trim
    // leading and following whitespace.
    var url = $('#input-url').val().trim();

    // Check to see if the input URL is empty.
    if (url.length == 0) {

      // If the input URL is empty, show an error to the user
      // via modal.
      var msg = 'Please enter a URL.';

      // Send error message to modal.
      $('#modal-error .message').text(msg);

      // Open the modal dialog.
      $('#modal-error').openModal();

    } else {

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

          // Clear URL input.
          $('#input-url').val('');

        };

      });

    }; // End URL length check.

  }); // End URL form submission.

});
