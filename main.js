$(function () {

    Parse.$ = jQuery;
    Parse.serverURL = "https://pg-app-r1ry1cwdn9kabthducfp1dvkssywd6.scalabl.cloud/1/";
    //ApplicationID, JavaScriptKey 
    Parse.initialize("HFJB7ZXbqGm9m0qo4EmOyIJqh55RboPAAzpjFSUE", "OD9l47qabknpoBcQaPhu57UIPph5EEKbSFpSAzaS");
    Parse.User.enableUnsafeCurrentUser()
    var currentUser = Parse.User.current();
    if (currentUser) {
        console.log('current');
    } else {
        console.log('not');
    }

    document.getElementById("username").innerText = Parse.User.current().get("username")


    // var user = Parse.User.current();

    // // Make a new post
    // var Post = Parse.Object.extend("Post");
    // var post = new Post();
    // post.set("title", "My New Post");
    // post.set("body", "This is some great content.");
    // post.set("user", user);
    // post.save(null, {
    //     success: function (post) {
    //         // Find all posts by the current user
    //         var query = new Parse.Query(Post);
    //         query.equalTo("user", user);
    //         query.find({
    //             success: function (usersPosts) {
    //                 // userPosts contains all of the posts by the current user.
    //             }
    //         });
    //     }
    // });

});