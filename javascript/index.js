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
      newUser();
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

  //Clear inputs after submit
  $("#email").val("");
  $("#password").val("");
  $("#name").val("");

  //don't refresh page
  return false;

});

//Add new user to database using Firebase UID
  function newUser () {

    var uid = firebase.auth().currentUser.uid;
    // uid = uid.toString();
    console.log(uid);

    database.ref().child("users").child(uid).set({
      uid: uid,
    })
    .then(function(){
      console.log(arguments);
      window.location.href = "home.html";
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
  }

//calls that function
//newUser();

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

//Redirect user after creating new account
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      database.ref().child("users").child(user.uid).once("value").then(function(snapshot){
        if(snapshot.exists()){

          //user exists
          window.location.href = "home.html";
        }

        //If that user doesn't exist, write their uid to the database
        else {
          newUser();
        }

      })
    }
      else {
      console.log("User is not signed in");
      }
  });

// //Redirect user after creating new account
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//       if(database.ref().child("users").child(user.uid).exists()){

//         //user exists
//         console.log("something");
//         window.location.href = "home.html";
//       }

//       //If that user doesn't exist, write their uid to the database
//       else {
//         newUser();
//       }
//   }
//     else {
//     console.log("User is not signed in");
//     }
// });


