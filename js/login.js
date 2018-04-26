$(function () {

    Parse.$ = jQuery;
    Parse.initialize(
        "Kc9c2eku460JzgK2M9S2Ev6n3PNsj5bWFOPSEYna",
        "qHlJuzaCNON0INY3Ysy8h9CWPar58dsNFUiSj3EY"
    );
    Parse.serverURL = 'https://pg-app-xbvkl5kilhgu1tfytwdhpjgfiyigkv.scalabl.cloud/1/';

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