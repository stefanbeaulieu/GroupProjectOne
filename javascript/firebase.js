// HTML script source
//<script src="https://www.gstatic.com/firebasejs/3.6.0/firebase.js"></script>

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCW5J7X-v5m9yX2_F9eAHzyGIHl6OBfgQw",
    authDomain: "giflygroupproject.firebaseapp.com",
    databaseURL: "https://giflygroupproject.firebaseio.com",
    storageBucket: "giflygroupproject.appspot.com",
    messagingSenderId: "1047383400502"
  };
firebase.initializeApp(config);


var database = firebase.database();
var auth = firebase.auth();

//Create new user
$("#submitButton").on('click', function() {

	var email = $("#InputEmail").val().trim();
	var password = $("#InputPassword").val().trim();

	//Create new user
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {

 	// Handle Errors here.
 	var errorCode = error.code;
 	var errorMessage = error.message;

 	//Error message
 	if (error) {
 		alert(errorMessage);
 	}

	});//end firebase function

	//Clear inputs after submit
	$("#InputEmail").val("");
	$("#InputPassword").val("");
	$("#InputName").val("");

	//don't refresh page
	return false;

});