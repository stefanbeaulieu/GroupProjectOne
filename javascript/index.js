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
var user = firebase.auth().currentUser;

//Create new user
$("#signupButton").on('click', function() {

	var email = $("#email").val().trim();
	var password = $("#password").val().trim();

	//Create new user
	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(function(){
			console.log(arguments);
		})
		.catch(function(error) {

		 	// Handle Errors here.
		 	var errorCode = error.code;
		 	var errorMessage = error.message;

		 	//Error message
		 	if (error) {
		 		alert(errorMessage);
		 	}
	});

	//Clear inputs after submit
	$("#email").val("");
	$("#password").val("");
	$("#name").val("");

	//don't refresh page
	return false;

});

//Sign in user

$("#loginButton").on('click', function() {

	var email = $("#signInEmail").val().trim();
	var password = $("#signInPassword").val().trim();

	firebase.auth().signInWithEmailAndPassword(email, password)
	.then(function(){
		$("#signInEmail").val("");
		$("#signInPassword").val("");

		window.location.href = "home.html";

	})
	.catch(function(error) {
		if (error) {

			alert(error);

		}
	});
	
	return false;
});

