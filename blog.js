$(function() {
 
    Parse.$ = jQuery;
    Parse.serverURL="https://pg-app-c8v9ur6nwwurkfuv3dld8adyr4qdeu.scalabl.cloud/1/";
    // Replace this line with the one on your Quickstart Guide Page
    Parse.initialize("N06MrHAtbHBXZYEPN1nR2lx2hfRWaYTg6PPWTMf8", "Vzry2vOBWzT2PdOS8eq6usT5Ps38WTWfTfj5gP9h");
 
    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
    testObject.save({foo: "bar"}).then(function(object) {
      alert("yay! it worked");
    });
 
});