
// // Attempting to fill the people list with the names from the database

// $(document).ready(function(){

//   var users = firebase.auth().currentUser;

//    var firebaseRef = firebase.database().ref().child("users").child();

//   firebaseRef.child('friends').on("value", function(snapshot) {

//     var data = snapshot.forEach(function(child) {

//         console.log(child.val());

//         var message = child.val();

//         $('#people').append("<li>" + message + "</li>" );
//     });
// });
// });

// Creating click event to run the addPerson function

$("#friend").click(addPerson);

// Creates click event that removes a person from the list

$('#people').on('click', '#delete', removePerson);

// Creates key function when the user hits enter the addPerson fuction runs

$("input").keypress(function(event) {

  if (event.which == 13) {

    addPerson();
  }
});

// Begin add person to list function

function addPerson() {

  // Get the content (value) of the input box.
  var person = $('#newperson').val();

    // Creates if statement so the user can not leave the text box blank
   if (person === ""){


      return;


  }

  // Propogates name into the people div to create the list

  $('#people').append('<div class="list-group-item"><li>' + person + '<span id="delete" class="text-right"> Remove</span></li></div>');

  // Clear the content of the input box.
  $('#newperson').val('');

  console.log(person);


}

// Variables to retrieve the information being inputted

var mainText = document.getElementById("newperson");
var submitBtn = document.getElementById("friend");
var fireHeading = document.getElementById("loggedIn");
var remove = document.getElementById("delete");

// Creates a variable to access firebase database in the correct location

var firebaseHeadingRef = firebase.database().ref().child("users");

// Grabbing a snapshot of the information stored

firebaseHeadingRef.on('value', function(datasnapshot){
  fireHeading.innerText = datasnapshot.val();

  $(document).ready(function(){

    var users = firebase.auth().currentUser;

    $("#people").html(JSON.stringify(datasnapshot.val()));
    console.log(datasnapshot.val());
});

});


// Adding a user to the database on the submit of user adding name to list

function submitClick() {

  var users = firebase.auth().currentUser;

  var firebaseRef = firebase.database().ref().child("users").child(users.uid).child("friend");

  // Setting value of the text

  var messageText = mainText.value;

  // Pushhing information to database

  firebaseRef.push().set(messageText);

  console.log(messageText);


}


// Allows the person to be removed from the list

function removePerson() {
  // Grab the closest div to the element that was clicked and remove it.
   $(this).closest("div").remove();

   // Allegedly attempting to remove the item from the database on click

   var users = firebase.auth().currentUser;

  var firebaseRef = firebase.database().ref().child("users").child(users.uid).child("friend");

    firebaseRef.child("friend").remove();



    console.log("friend");
}
