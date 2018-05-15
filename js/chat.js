$(function () {
    Parse.$ = jQuery;
    Parse.initialize(
        "pS2OMrZoPr7Z0Dg3JNiBEt26W7sUffOAlXkcaUnP",
        "mPoO6vFBsXqk9ysMy4Hycvz94WPPf3klnc7NUfs3"
      );
    Parse.serverURL = 'https://pg-app-jns12nd4yd1x33wca2iqz5cys7u4se.scalabl.cloud/1/';

    document.getElementById("back").onclick = function () {
        window.location.href = "main.html";
    }
    var msgBuffer = 0;
    function parseUrlQuery() {
        var data = {};
        if (location.search) {
            var pair = (location.search.substr(1)).split('&');
            for (var i = 0; i < pair.length; i++) {
                var param = pair[i].split('=');
                data[param[0]] = param[1];
            }
        }
        return data;
    }

    toUser = parseUrlQuery()['ToUser'];
    document.getElementById("chatwith").innerText = toUser;
    sender = Parse.User.current().get("username");
    
    //Отправка нового сообщения
    document.getElementById("send_msg").onclick = function () {
        var text = document.getElementById("message").value;
        if (text != "") {
            //Отправка
            var Chat = Parse.Object.extend("Chat");
            var new_message = new Chat();
            //var query = new Parse.Query(Chat);
            //query.equalTo("UserName", sender);
            //query.equalTo("ToUser", toUser);
            new_message.set('UserName', sender);
            new_message.set('ToUser', toUser);
            new_message.set('Messages', text);
            new_message.save();
            // query.find({
            //     success: function (msg) {
            //         var array = msg[0].get("Messages");
            //         var elem = { "text": text, "date": new Date(), "author": sender };
            //         array.push(elem);
            //         msg[0].set("Messages", array);
            //         msg[0].save();
            //     }
            // });

            // query = new Parse.Query(Chat);
            // query.equalTo("UserName", toUser);
            // query.equalTo("ToUser", sender);

            // query.find({
            //     success: function (msg) {
            //         var array = msg[0].get("Messages");
            //         var elem = { "text": text, "date": new Date(), "author": sender };
            //         array.push(elem);
            //         msg[0].set("Messages", array);
            //         msg[0].save();
            //         //msgBuffer = array.length;
            //     }
            // });

            document.getElementById("message").value = "";
            //location.reload();
        }
        else {
            alert("Сообщение не может быть пустым!");
        }
    }

    function interval() {
        setInterval(function () {
            console.log('interval working')
            var Chat = Parse.Object.extend("Chat");
            var query = new Parse.Query(Chat);
            query.containedIn('UserName', [sender, toUser]);
            query.containedIn('ToUser', [sender, toUser]);
            //query.equalTo("UserName", sender);
            //query.equalTo("ToUser", toUser);
            
            var articleDiv = document.querySelector("ul.shoutbox-content");

            query.find({
                success: function (msg) {
                    //var array = msg[0].get("Messages");
                    //if (array.length != msgBuffer) {
                    
                    if (msg.length != msgBuffer ) {
                        console.log("msg.length" + msg.length)
                        
                        for (let i = msgBuffer; i < msg.length; i++) {
                            var text = msg[i].get('Messages');
                            var author = msg[i].get('UserName');
                            var date = msg[i].get('createdAt');
    
                            var p = document.createElement("p");
                            p.className = "shoutbox-comment";
    
                            var li = document.createElement("li");
                            var span = document.createElement("span")
                            span.className = "shoutbox-username";
                            li.className = "liClass";
                            li.onclick = function () {
                                console.log("clisdfck li");
                                //Доделать ответ по клику
                                //window.location.href = "chat.html?ToUser=" + msg[i].get("ToUser");
                            }
                            var liText = document.createTextNode(author);
                            span.appendChild(liText);
                            var pText = document.createTextNode(text);
                            p.appendChild(pText);
    
                            var spanDate = document.createElement("span");
                            spanDate.className = "shoutbox-comment-ago";
                            var dateText = document.createTextNode(date);
                            spanDate.appendChild(dateText);
    
                            li.appendChild(span);
                            li.appendChild(p);
                            li.appendChild(spanDate);
    
                            articleDiv.appendChild(li);
                        }
                        msgBuffer = msg.length;
                    }
                    //console.log(array.length);
                }
            })
        }, 1500);
    }

    function getAllChats() {
        var Chat = Parse.Object.extend("Chat");
        //Основной элемент для заполнения
        var articleDiv = document.querySelector("ul.shoutbox-content");
        
        var Chat = Parse.Object.extend("Chat");
        var query = new Parse.Query(Chat);
        query.containedIn('UserName', [sender, toUser]);
        query.containedIn('ToUser', [toUser, sender]);
        query.find({
            success: function (msg) {
                if (msg.length == 0) {
                    //Создаем новый диалог
                    // var messages = [
                    //     {
                    //       "text": "Hello!",
                    //       "date": new Date(),
                    //       "author": sender
                    //     }];
                    var new_chat = new Chat();
                    new_chat.set("UserName", sender);
                    new_chat.set("ToUser", toUser);
                    new_chat.set("Messages", 'Hi there!');
                    new_chat.save(null,{
                        success:function (user) {
                            console.log("Success");
                        },
                        error:function (user, error) {
                            console.log("Error");
                        }
                    });
                    // var new_chat = new Chat();
                    // new_chat.set("UserName", toUser);
                    // new_chat.set("ToUser", sender);
                    // new_chat.set("Messages", messages);
                    // new_chat.save(null,{
                    //     success:function (user) {
                    //         console.log("Success");
                    //     },
                    //     error:function (user, error) {
                    //         console.log("Error");
                    //     }
                    // });
                }
                else {
                    console.log('msg length = '+msg.length);
                    //var array = msg[0].get("Messages");
                    msgBuffer = msg.length;
                    for (let i = 0; i < msg.length; i++) {
                        var text = msg[i].get('Messages');
                        var author = msg[i].get('UserName');
                        var date = msg[i].get('createdAt');

                        var p = document.createElement("p");
                        p.className = "shoutbox-comment";

                        var li = document.createElement("li");
                        var span = document.createElement("span")
                        span.className = "shoutbox-username";
                        li.className = "liClass";
                        li.onclick = function () {
                            console.log("click li");
                            //Доделать ответ по клику
                            //window.location.href = "chat.html?ToUser=" + msg[i].get("ToUser");
                        }
                        var liText = document.createTextNode(author);
                        span.appendChild(liText);
                        var pText = document.createTextNode(text);
                        p.appendChild(pText);

                        var spanDate = document.createElement("span");
                        spanDate.className = "shoutbox-comment-ago";
                        var dateText = document.createTextNode(date);
                        spanDate.appendChild(dateText);

                        li.appendChild(span);
                        li.appendChild(p);
                        li.appendChild(spanDate);

                        articleDiv.appendChild(li);
                    }
                }
            }
        });
    }

    //Получаем историю сообщений
    getAllChats();

    interval();
});