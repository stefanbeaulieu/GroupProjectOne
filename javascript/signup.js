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

var ref = new Firebase("https://giflygroupproject.firebaseio.com");
var authClient = new FirebaseAuthClient(ref, function(error, user) {
  if (error) {
    alert(error);
    return;
  }
  if (user) {
    // User is already logged in.
    doLogin(user);
  } else {
    // User is logged out.
    showLoginBox();
  }
});

function showLoginBox() {
  
  // Do whatever DOM operations you need to show the login/registration box.
  $("#signupButton").on("click", function() {
    var name = $("#name").val();
    var email = $("#email").val();
    var password = $("#password").val();
    authClient.createUser(email, password, function(error,  user) {
      if (!error) {
        doLogin(user);
      } else {
        alert(error);
      }
    });
  });
}

function showLoginBox() {
  
  // Do whatever DOM operations you need to show the login/registration box.
  $("#loginButton").on("click", function() {
    authClient.login("password", {
      email: $("#signInEmail").val(),
      password: $("#signInPassword").val(),
    });
  });
}

