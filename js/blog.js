$(function() {
 
    Parse.$ = jQuery;
    Parse.initialize(
      "Kc9c2eku460JzgK2M9S2Ev6n3PNsj5bWFOPSEYna",
      "qHlJuzaCNON0INY3Ysy8h9CWPar58dsNFUiSj3EY"
    );
    Parse.serverURL = 'https://pg-app-xbvkl5kilhgu1tfytwdhpjgfiyigkv.scalabl.cloud/1/';
    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
    testObject.save({foo: "bar"}).then(function(object) {
      alert("yay! it worked");
    });
 
});