$("button").click(addPerson);

$(document).on('click', '#delete', removePerson);

$("input").keypress(function(event) {

  if (event.which == 13) {
    
    addPerson();
  }
});

function addPerson() {

  // Get the content (value) of the input box.
  var person = $('#newperson').val();

  // Append that content to the #tasks div.
  // Nest our content in another div in another div 
  // with a span containing an X.
  // Notice the id? We can delete the task whenever the user clicks the span.
  $('#people').append('<li>' + person + '<span id="delete"> Remove</span></li>');

  // Clear the content of the input box.
  $('#newperson').val('');
}


function removePerson() {
  // Grab the closest div to the element that was clicked and remove it.
  // (In this case, the closest element is the one that's encapsulating it.)
  $(this).closest("li").remove();
}

