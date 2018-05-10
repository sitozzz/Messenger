$(function () {

    Parse.$ = jQuery;
    Parse.initialize(
        "pS2OMrZoPr7Z0Dg3JNiBEt26W7sUffOAlXkcaUnP",
        "mPoO6vFBsXqk9ysMy4Hycvz94WPPf3klnc7NUfs3"
      );
    Parse.serverURL = 'https://pg-app-jns12nd4yd1x33wca2iqz5cys7u4se.scalabl.cloud/1/';

    document.getElementById("register").onclick = function () {
        var username = document.getElementById("usr").value;
        var pass = document.getElementById("pass").value;
        
        var Users = Parse.Object.extend("User");
        var user = new Users();
        user.set("username", username);
        user.set("password", pass);
        user.save(null,{
            success: function (user) {
                alert("Успешная регистрация");
            },
            error: function (user, error) {
                alert("Такой пользователь уже существует");
            }
        });
    }
    $('.form-signin').on('submit', function (e) {

        // Prevent Default Submit Event
        e.preventDefault();

        // Get data from the form and put them into variables
        var data = $(this).serializeArray(),
            username = data[0].value,
            password = data[1].value;

        // Call Parse Login function with those variables
        Parse.User.logIn(username, password, {
            // If the username and password matches
            success: function (user) {
                window.location.href = "main.html";
                //alert('Welcome!');
            },
            // If there is an error
            error: function (user, error) {
                console.log(error);
            }
        });
    });
});