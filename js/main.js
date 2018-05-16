$(function () {

    Parse.$ = jQuery;
    Parse.initialize(
        "pS2OMrZoPr7Z0Dg3JNiBEt26W7sUffOAlXkcaUnP",
        "mPoO6vFBsXqk9ysMy4Hycvz94WPPf3klnc7NUfs3"
    );
    Parse.serverURL = 'https://pg-app-jns12nd4yd1x33wca2iqz5cys7u4se.scalabl.cloud/1/';
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
        else {
            alert('Это поле не может быть пустым');
        }
    }

    document.getElementById('logout').onclick = logout;

    function logout() {
        window.location.href = "index.html";
        Parse.User.logOut().then(() => {
            var currentUser = Parse.User.current();
        });
    }

    function create_Dialogs(final_dict) {
        var iterator = Object.keys(final_dict);

        var articleDiv = document.querySelector("ul.shoutbox-content");
        articleDiv.innerHTML = "";
        for (let k = 0; k < iterator.length; k++) {



            var p = document.createElement("p");
            p.className = "shoutbox-comment";
            //Здесь будет цикл, но его пока нету:)
            var li = document.createElement("li");
            var span = document.createElement("span")
            span.className = "shoutbox-username";
            li.className = "liClass";
            li.onclick = function () {
                
                window.location.href = "chat.html?ToUser=" + iterator[k];
            }

            var liText = document.createTextNode('Dialog with:    '+iterator[k]);
            span.appendChild(liText);

            var br = document.createElement("br");
            span.appendChild(br);
            

            var fromUserText = document.createTextNode(final_dict[iterator[k]][2]+': ');
            p.appendChild(fromUserText);

            var pText = document.createTextNode(final_dict[iterator[k]][0]);
            p.appendChild(pText);

            

            var spanDate = document.createElement("span");
            spanDate.className = "shoutbox-comment-ago";
            var options = {
                year: "numeric", month: "short",
                day: "numeric", hour: "2-digit", minute: "2-digit"
            };

            var tme = final_dict[iterator[k]][1]
           
            var dateText = document.createTextNode(tme.toLocaleTimeString("en-us", options));

            spanDate.appendChild(dateText);

            li.appendChild(span);
            li.appendChild(p);
            li.appendChild(spanDate);

            articleDiv.appendChild(li);

        }

    }

    var final_dict = {};
    function interval() {
        setInterval(function () {
            //var myObject = new Object();

            var UserName_dict = new Object();
            UserName_dict['test'] = 'test';
            var ToUser_dict = new Object();

            var Chat = Parse.Object.extend("Chat");
            //Основной элемент для заполнения

            var dateQuery = new Parse.Query(Chat);
            dateQuery.equalTo("UserName", username);

            //console.log("interval starts");


            dateQuery.find({

                success: function (UserName1) {

                    UserName_dict = new Object();
                    for (let i = 0; i < UserName1.length; i++) {
                        var arr = [UserName1[i].get('Messages'), UserName1[i].get('createdAt'), UserName1[i].get('UserName')];
                        UserName_dict[UserName1[i].get('ToUser')] = arr;


                    }


                    dateQuery = new Parse.Query(Chat);
                    dateQuery.equalTo("ToUser", username);
                    dateQuery.find({
                        success: function (ToUser) {


                            for (let i = 0; i < ToUser.length; i++) {
                                var arr = [ToUser[i].get('Messages'), ToUser[i].get('createdAt'), ToUser[i].get('UserName')];
                                ToUser_dict[ToUser[i].get('UserName')] = arr;
                            }
                            console.log("keys in func");

                            keys1 = Object.keys(UserName_dict);


                            keys2 = Object.keys(ToUser_dict);
                            console.log(keys1);
                            console.log(keys2);
                            if (keys1.length > keys2.length) {
                                console.log('1');
                                for (let i = 0; i < keys1.length; i++) {

                                    var check = false
                                    if (ToUser_dict[keys1[i]] == undefined) {

                                        final_dict[keys1[i]] = UserName_dict[keys1[i]];
                                        console.log('final_dict_for  первый if ' + i);

                                        check = true;

                                    }

                                    if (check == false && UserName_dict[keys1[i]][1] > ToUser_dict[keys1[i]][1]) {

                                        console.log('final_dict_for  второй if ' + i);
                                        final_dict[keys1[i]] = UserName_dict[keys1[i]];
                                    }
                                    else if (check == false) {
                                        console.log('final_dict_for третий if' + i);
                                        final_dict[keys1[i]] = ToUser_dict[keys1[i]];
                                        //console.log('UserName_dict');
                                    }


                                    //console.log('final_dict');
                                    //console.log(keys1[i]);
                                    //console.log(final_dict);

                                }

                                create_Dialogs(final_dict);
                            }
                            else {
                                console.log('2');
                                for (let i = 0; i < keys2.length; i++) {

                                    var check = false
                                    if (UserName_dict[keys2[i]] == undefined) {

                                        final_dict[keys2[i]] = ToUser_dict[keys2[i]];
                                        console.log('final_dict_for  первый if ' + i);

                                        check = true;

                                    }

                                    if (check == false && UserName_dict[keys2[i]][1] > ToUser_dict[keys2[i]][1]) {

                                        console.log('final_dict_for  второй if ' + i);
                                        final_dict[keys2[i]] = UserName_dict[keys2[i]];
                                    }
                                    else if (check == false) {
                                        console.log('final_dict_for третий if' + i);
                                        final_dict[keys2[i]] = ToUser_dict[keys2[i]];
                                        //console.log('UserName_dict');
                                    }


                                    //console.log('final_dict');
                                    //console.log(keys1[i]);
                                    //console.log(final_dict);

                                }
                                create_Dialogs(final_dict);

                            }

                            console.log('final_dict после цикла');
                            console.log(final_dict);
                           



                        }
                    })

                    //var iterator = Object.keys(dict_UserName);
                    // console.log("после");
                    // console.log(dict_UserName['neivan']);

                }

            })

            // console.log("keys out");
            // console.log(Object.keys(UserName_dict));

            // // console.log("до");
            // // console.log(dict_UserName);


            // //old_createdAt = dict_UserName[ToUser[i].get('UserName')][1];
            // //new_createdAt = ToUser[i].get('createdAt');
            // //Object.keys(ToUser_dict).length

            // console.log("UserName" + len1);
            // console.log(Object.keys(UserName_dict));
            // console.log(UserName_dict);

            // console.log("ToUser" + len2);
            // console.log(ToUser_dict);






        }, 1500);
    }


    //-----------------------------

    // for (let j = 0; j < iterator.length; j++) {
    //     console.log(iterator[j]);

    //     var Chat = Parse.Object.extend("Chat");
    //     var dateQuery = new Parse.Query(Chat);

    //     dateQuery.equalTo("UserName", iterator[j]);

    //     dateQuery.equalTo("ToUser", username);

    //     dateQuery.find({
    //         success: function (UserName2) {

    //             console.log("UserName2 - " + UserName2[UserName2.length - 1].get("createdAt") + "uname 1" + dict_UserName[iterator[j]][1]);
    //             if (UserName2[UserName2.length - 1].get("createdAt") > dict_UserName[iterator[j]][1]) {
    //                 console.log('заменяем');
    //                 var arr1 = [UserName2[UserName2.length - 1].get("Messages"), UserName2[UserName2.length - 1].get("createdAt")];
    //                 console.log(iterator[j]);
    //                 dict_UserName[iterator[j]] = arr1;



    //             }
    //             console.log('выводим по ключу не иван 1 ');
    //             console.log(dict_UserName['neivan'][0]);
    //             console.log('dict_UserName внутри ');
    //             console.log(dict_UserName);
    //             return(dict_UserName);

    //         }

    //     })
    //     console.log('выводим по ключу не иван 2 ');
    //     console.log(dict_UserName['neivan'][0]);
    //     console.log('dict_UserName снаружи');
    //     console.log(dict_UserName);



    // }

    //------------------------


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