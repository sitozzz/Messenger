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
    username = Parse.User.current().get("username");
    document.getElementById("username").innerText = username

    function getAllChats() {
        var Chat = Parse.Object.extend("Chat");
        //Основной элемент для заполнения
        var articleDiv = document.querySelector("ul.shoutbox-content");
        //Здесь будет цикл, но его пока нету:)
        var li = document.createElement("li");
        var span = document.createElement("span")
        span.className = "shoutbox-username";
        
        var liText = document.createTextNode(username);
        span.appendChild(liText);

        var p = document.createElement("p");
        p.className = "shoutbox-comment";
        var dateQuery = new Parse.Query(Chat);
        dateQuery.descending("createdAt");
        dateQuery.limit(1);
        //dateQuery.include("LastMessage");
        dateQuery.find({
            success: function (msg) {
                var pText = document.createTextNode(msg[0].get("LastMessage"));
                p.appendChild(pText);
            }
        });
        

       
        var spanDate = document.createElement("span");
        spanDate.className = "shoutbox-comment-ago";
        var dateText = document.createTextNode("10.20.12");
        spanDate.appendChild(dateText);

        
        li.appendChild(span);
        li.appendChild(p);
        li.appendChild(spanDate);
        
        articleDiv.appendChild(li);
        
        
        //var ul = document.getElementById("chat-container");
        // var li = document.createElement("li");
        // li.innerText = "Created element by js";
        // ul.appendChild(li);

        // ul.append('<li>' +
        //     '<span class="shoutbox-username">' + Parse.User.current().get("username") + '</span>' +
        //     '<p class="shoutbox-comment">' + "comment to add" + '</p>' +
        //     '<div class="shoutbox-comment-details"><span class="shoutbox-comment-reply" data-name="' + "Another Name " + '">REPLY</span>' +
        //     '<span class="shoutbox-comment-ago">' + "Date here" + '</span></div>' +
        //     '</li>');
    }
    getAllChats();

    //Пример добавления и получения данных
    // var Chat = Parse.Object.extend("Chat");
    // var chat = new Chat();
    // chat.set("LastMessage", "Some message here");
    // chat.set("UserID", currentUser.id);
    // console.log(currentUser.id);
    // chat.set("UserName", currentUser.get("username"));
    // chat.save(null,{
    //     success: function(chat){
    //         var query = new Parse.Query(Chat);
    //         query.equalTo("UserID", currentUser.id);
    //         query.find({
    //             success:function (usersChat) {
    //                console.log(usersChat);
    //             }
    //         });
    //     }
    // });
});