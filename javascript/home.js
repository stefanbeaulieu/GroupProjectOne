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
var user = firebase.auth().currentUser;

//Detects if user is logged in and displays info plus sign out button at top of page
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		//append this text to the doc
		$('#loggedIn').html('Logged in as: ' + user.email + ' | ' + '<a id="signOutButton">sign out</a>');

			//Sign out a user
			function signOut () {
				firebase.auth().signOut().then(function() {
				  // Sign-out successful.
				  window.location.href = "index.html";
				}, function(error) {
				  // An error happened.
					console.log(error);
				});
			}
				//Calls signOut on click;
				$("#signOutButton").on('click', function() {
					signOut();
				});

	} else {
		//Sign out a user
			function signOut () {
				firebase.auth().signOut().then(function() {
				  // Sign-out successful.
				  window.location.href = "index.html";
				}, function(error) {
				  // An error happened.
					console.log(error);
				});
			}
		signOut();
		console.log("User is not signed in");
	}
});