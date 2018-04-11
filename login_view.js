$(function() {
 
    Parse.$ = jQuery;
    Parse.serverURL="https://pg-app-r1ry1cwdn9kabthducfp1dvkssywd6.scalabl.cloud/1/";
    //ApplicationID, JavaScriptKey 
    Parse.initialize("HFJB7ZXbqGm9m0qo4EmOyIJqh55RboPAAzpjFSUE", "OD9l47qabknpoBcQaPhu57UIPph5EEKbSFpSAzaS");
 
    var LoginView = Parse.View.extend({
        template:Handlebars.compile($('#login-tpl').html()),
        events: {
            'submit .form-signin': 'login'
        },
        login: function(e) {
     
            // Prevent Default Submit Event
            e.preventDefault();
     
            // Get data from the form and put them into variables
            var data = $(e.target).serializeArray(),
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
        },
            render: function(){
            this.$el.html(this.template());
        }
    })
    WelcomeView = Parse.View.extend({
        template: Handlebars.compile($('#welcome-tpl').html()),
        render: function(){
            var attributes = this.model.toJSON();
            this.$el.html(this.template(attributes));

        }
        
    });
    var loginView = new LoginView();
    loginView.render();
    $('.main-container').html(loginView.el);

    
});