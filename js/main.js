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
    //Текущее количество диалогов
    var dialogCount = 0;
    //Добавление нового диалога

    document.getElementById("search").onclick = function () {
        //console.log("click");
        document.getElementById("search_advice_wrapper").style.visibility = 'visible';
    }

    document.getElementById("search").oninput = function () {

        $("#search_advice_wrapper").html("").show();
        append_advice();
    }

    function append_advice() {
        search_text = document.getElementById("search").value;
        if (search_text.length > 0) {
            var reg = new RegExp(search_text, "i")

            var Users = Parse.Object.extend("User");
            var usrQuery = new Parse.Query(Users);

            usrQuery.find({
                success: function (usr) {
                    for (let i = 0; i < usr.length; i++) {
                        var usrName = usr[i].get("username");
                        if (usrName.match(reg) != null) {
                            $('#search_advice_wrapper').append('<div class="advice_variant">' + usrName + '</div>');
                        }
                    }
                    var elems = document.getElementsByClassName("advice_variant");
                    for (i = 0; i < elems.length; i++) {
                        elems[i].onclick = function () {
                            text = this.innerText;
                            document.getElementById("search").value = text;
                            document.getElementById("search_advice_wrapper").style.visibility = 'hidden';
                            $("#search_advice_wrapper").html("").show();
                        }
                    }
                }
            });
        }
    }
    document.getElementById("new_chat").onclick = function () {
        var user = document.getElementById("search").value;
        if (user.length != 0) {
            window.location.href = "chat.html?ToUser=" + user;
        }
        else{
            alert('Это поле не может быть пустым');
        }
    }

    function interval() {
        setInterval(function () {
            var Chat = Parse.Object.extend("Chat");
            //Основной элемент для заполнения
            var articleDiv = document.querySelector("ul.shoutbox-content");
            var dateQuery = new Parse.Query(Chat);
            dateQuery.equalTo("UserName", username);
            
            dateQuery.find({
                success: function (msg) {
                    
                    if (msg.length != dialogCount) {
                        var articleDiv = document.querySelector("ul.shoutbox-content");
                        for (let i = dialogCount; i < msg.length; i++) {
                        
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
                            var options = {
                                year: "numeric", month: "short",
                            day: "numeric", hour: "2-digit", minute: "2-digit"
                            };
                            var dateText = document.createTextNode(msg[i].get("updatedAt").toLocaleTimeString("en-us", options));
                            spanDate.appendChild(dateText);

                            li.appendChild(span);
                            li.appendChild(p);
                            li.appendChild(spanDate);

                            articleDiv.appendChild(li);

                        }
                        dialogCount = msg.length;
                    }                    
                }
            })
        }, 1500);
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
                //Запоминаем количество сообщений при загрузке
                dialogCount = msgArray.length;
                var msgArray = msg;
                console.log("len = " + msgArray.length)
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
                    var options = {
                        year: "numeric", month: "short",
                       day: "numeric", hour: "2-digit", minute: "2-digit"
                    };
                    var dateText = document.createTextNode(msg[i].get("updatedAt").toLocaleTimeString("en-us", options));
                    spanDate.appendChild(dateText);

                    li.appendChild(span);
                    li.appendChild(p);
                    li.appendChild(spanDate);

                    articleDiv.appendChild(li);
                }

            }
        });
    }
    //Получаем список диалогов 1 раз
    getAllChats();


    interval();
});