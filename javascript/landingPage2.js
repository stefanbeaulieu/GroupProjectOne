//reference the database
var database = firebase.database();

//Grabs current user and/or user id
//This needs to be performed within same scope or else you will encounter 'property uid of null' errors in dev tools.
// var user = firebase.auth().currentUser;
// OR
// var uid = firebase.auth().currentUser.uid;

//Add person
function addPerson() {

	//grabs current user
	var uid = firebase.auth().currentUser.uid;

	//Grab friend name input
	var person = $("#addFriend").val();

	//User cannot leave box blank
	if (person === ""){
		return false;
	}
		//Creates a friend in database for specified user
		var newPerson = database.ref().child("users").child(uid).push(person);

		//Grabs the unique key created by .push() for later reference
		var newPersonPath = JSON.stringify(newPerson.key);

	//Create a new list item
	var newListItem = $("<li>");

	//Add class to list item for bootstrap
	newListItem.addClass("list-group-item");

	//Save the database path key per friend to the HTML as an ID
	newListItem.attr('id', newPersonPath);

	//Add name to list item
	newListItem.text(person);

	//Append item to friend list in HTML
	$("#friendList").append(newListItem);

	//Clear input value
	$("#addFriend").val("");
}


//Runs addPerson() if enter key is pressed in addFriend input
$("#addFriend").keypress(function(event) {
  if (event.which == 13) {
    addPerson();
  }
});

// Runs addPerson() on click event
$("#friend").on('click', addPerson);

//Populate friends from database
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		//Parent pathing for user
		var parent = database.ref().child("users").child(user.uid);

		parent.once("value")
		.then(function(snapshot) {
			//Loops through parent for every child
			snapshot.forEach(function (childSnapshot) {
				var key = childSnapshot.key;
				//Grabs the data for each child, in our case the name of the friend
				var childData = childSnapshot.val();
				//Verify it is printing the right data
				console.log(childData);

				//Repopulating the list
					//Create a new list item
					var newListItem = $("<li>");

					//Add class to list item for bootstrap
					newListItem.addClass("list-group-item");

					//Save the database path key per friend to the HTML as an ID
					newListItem.attr('id', key);

					//Add name to list item
					newListItem.text(childData);

					//Append item to friend list in HTML
					$("#friendList").append(newListItem);

			});
		});
	}
});