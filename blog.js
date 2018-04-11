$(function() {
 
    Parse.$ = jQuery;
    Parse.serverURL="https://pg-app-r1ry1cwdn9kabthducfp1dvkssywd6.scalabl.cloud/1/";
    //ApplicationID, JavaScriptKey 
    Parse.initialize("HFJB7ZXbqGm9m0qo4EmOyIJqh55RboPAAzpjFSUE", "OD9l47qabknpoBcQaPhu57UIPph5EEKbSFpSAzaS");
 
    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
    testObject.save({foo: "bar"}).then(function(object) {
      alert("yay! it worked");
    });
 
});