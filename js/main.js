$(function () {

    Parse.$ = jQuery;
    Parse.initialize(
        "Kc9c2eku460JzgK2M9S2Ev6n3PNsj5bWFOPSEYna",
        "qHlJuzaCNON0INY3Ysy8h9CWPar58dsNFUiSj3EY"
      );
    Parse.serverURL = 'https://pg-app-xbvkl5kilhgu1tfytwdhpjgfiyigkv.scalabl.cloud/1/';
    Parse.User.enableUnsafeCurrentUser()
    var currentUser = Parse.User.current();
    if (currentUser) {
        console.log('current');
    } else {
        console.log('not');
    }
    username = Parse.User.current().get("username");
    document.getElementById("username").innerText = username;
    document.getElementById("new_chat").onclick = function(){
        //Переходим к добавлению нового диалога
        //window.location.href = "chat.html";
    }
    function getAllChats() {
        var Chat = Parse.Object.extend("Chat");
        //Основной элемент для заполнения
        var articleDiv = document.querySelector("ul.shoutbox-content");
        var dateQuery = new Parse.Query(Chat);
        dateQuery.equalTo("UserName", username);
        dateQuery.descending("updatedAt");
        dateQuery.limit(50);
        //dateQuery.include("LastMessage");
        dateQuery.find({
            success: function (msg) {
                //console.log(msg[0].get("ToUser"));

                var msgArray = msg;
                for (let i = 0; i < msg.length; i++) {
                    console.log(msg[i].get("Messages")[msg[i].get("Messages").length - 1]["text"]);

                    var p = document.createElement("p");
                    p.className = "shoutbox-comment";
                    //Здесь будет цикл, но его пока нету:)
                    var li = document.createElement("li");
                    var span = document.createElement("span")
                    span.className = "shoutbox-username";
                    li.className = "liClass";
                    li.onclick = function () {
                            console.log("click li");
                            window.location.href = "chat.html?ToUser=" + msg[i].get("ToUser");
                    }
                    var liText = document.createTextNode(msg[i].get("ToUser"));
                    span.appendChild(liText);
                    var pText = document.createTextNode(msg[i].get("Messages")[msg[i].get("Messages").length - 1]["text"]);
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
    }
    getAllChats();
});