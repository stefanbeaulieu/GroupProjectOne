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

//Sign up button click function
$("#signupButton").on('click', function() {

	//Input values
  var name = $("#name").val().trim();
  var email = $("#email").val().trim();
  var password = $("#password").val().trim();

  //Create new user
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function() {
      console.log(arguments);
    })
    .catch(function(error) {

      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      //Error message
      if (errorCode === 'auth/wrong-password') {
        $('#myModal').modal($('.modal-body').html(errorMessage));
      } else if (errorCode === 'auth/user-not-found') {
        $('#myModal').modal($('.modal-body').html(errorMessage));
      } else if (errorCode === 'auth/user-disabled') {
        $('#myModal').modal($('.modal-body').html(errorMessage));
      } else if (errorCode === 'auth/invalid-email') {
        $('#myModal').modal($('.modal-body').html(errorMessage));
      }

    });
      
  //Manually add this user to the database to reference when they are signed in through Authentication
  database.ref('users/').push({
    email: email,
    name: name,
    people: {},
  })
  .then(function(){
    console.log(arguments);
    //GIVES ERROR, DOES NOT SIGN IN USER
    //redirect after signing up (Firebase automatically signs in after creating account)
    // window.location.href = "home.html";
  })
  .catch(function(error) {

      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      //Error message
      //GIVES ERROR MESSAGE
      if (error) {
        alert(errorMessage);
      }
  });

  //Manually add this user to the database to reference when they are signed in through Authentication
  database.ref('/users' + email).set({
    name: name,
    email: email
  })

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
    .then(function() {
      $("#signInEmail").val("");
      $("#signInPassword").val("");

      window.location.href = "home.html";
    })
    .catch(function(error) {

      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode === 'auth/wrong-password') {
        $('#myModal').modal($('.modal-body').html(errorMessage));
      } else if (errorCode === 'auth/user-not-found') {
        $('#myModal').modal($('.modal-body').html(errorMessage));
      } else if (errorCode === 'auth/user-disabled') {
        $('#myModal').modal($('.modal-body').html(errorMessage));
      } else if (errorCode === 'auth/invalid-email') {
        $('#myModal').modal($('.modal-body').html(errorMessage));
      }
    })
  return false;

});

//Redirect user after creating new account. See line 52.
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location.href = "home.html";
  } else {
    console.log("User is not signed in");
  }
})

