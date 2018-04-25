
Parse.initialize(
    "Kc9c2eku460JzgK2M9S2Ev6n3PNsj5bWFOPSEYna",
    "qHlJuzaCNON0INY3Ysy8h9CWPar58dsNFUiSj3EY"
  );
  Parse.serverURL = 'https://pg-app-xbvkl5kilhgu1tfytwdhpjgfiyigkv.scalabl.cloud/1/';

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
    
    adress = parseUrlQuery()['User'];
    console.log(adress);