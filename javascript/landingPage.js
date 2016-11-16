$("#friend").click(addPerson);

$('#people').on('click', '#delete', removePerson);

$("input").keypress(function(event) {

  if (event.which == 13) {
    
    addPerson();
  }
});

function addPerson() {

  // Get the content (value) of the input box.
  var person = $('#newperson').val();

   if (person == ""){
      alert("Please Input Name")

      return;


  }

  $('#people').append('<div class="list-group-item"><li>' + person + '<span id="delete" class="text-right"> Remove</span></li></div>');

  // Clear the content of the input box.
  $('#newperson').val('');

 
}


function removePerson() {
  // Grab the closest div to the element that was clicked and remove it.

  $(this).closest("div").remove();
}

