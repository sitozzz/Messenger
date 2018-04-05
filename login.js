$(function() {
 
    Parse.$ = jQuery;
    Parse.serverURL="https://pg-app-c8v9ur6nwwurkfuv3dld8adyr4qdeu.scalabl.cloud/1/";
    Parse.initialize("N06MrHAtbHBXZYEPN1nR2lx2hfRWaYTg6PPWTMf8", "Vzry2vOBWzT2PdOS8eq6usT5Ps38WTWfTfj5gP9h");
 
    $('.form-signin').on('submit', function(e) {
 
        // Prevent Default Submit Event
        e.preventDefault();
     
        // Get data from the form and put them into variables
        var data = $(this).serializeArray(),
            username = data[0].value,
            password = data[1].value;
     
        // Call Parse Login function with those variables
        Parse.User.logIn(username, password, {
            // If the username and password matches
            success: function(user) {
                alert('Welcome!');
            },
            // If there is an error
            error: function(user, error) {
                console.log(error);
            }
        });
     
    });
 
});