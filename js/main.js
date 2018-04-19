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
        

        
        var dateQuery = new Parse.Query(Chat);
        dateQuery.descending("updatedAt");
        dateQuery.limit(50);
        //dateQuery.include("LastMessage");
        dateQuery.find({
            success: function (msg) {
                for (let i = 0; i < msg.length; i++) {
                    var p = document.createElement("p");
                    p.className = "shoutbox-comment";
                    //Здесь будет цикл, но его пока нету:)
                    var li = document.createElement("li");
                    var span = document.createElement("span")
                    span.className = "shoutbox-username";
                    li.className = "liClass";
                    var liText = document.createTextNode(msg[i].get("ToUser"));
                    span.appendChild(liText);
                    var pText = document.createTextNode(msg[i].get("LastMessage"));
                    p.appendChild(pText);
                    
                    var spanDate = document.createElement("span");
                    spanDate.className = "shoutbox-comment-ago";
                    var dateText = document.createTextNode(msg[i].get("updatedAt"));
                    spanDate.appendChild(dateText);
                    
                    li.appendChild(span);
                    li.appendChild(p);
                    li.appendChild(spanDate);
                    
                    articleDiv.appendChild(li);
                }
                
            }
        });
        var mod = document.querySelectorAll('.liClass');
        for (let index = 0; index < mod.length; index++) {
            mod[index].addEventListener('click', function (user_id) {
                window.location.href="chat.html?User=" + user_id;
            });
        }
        
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