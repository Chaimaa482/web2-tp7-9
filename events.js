// var event=require("events");
// var fs=require("fs");

// var obj=new event.EventEmitter();

// var Fichier;
// var Fichier2;


// obj.addListener("write",f1=function(){
//     Fichier= fs.createWriteStream("fichier.txt");
//     Fichier.write("Hello");

// });
// obj.addListener("dup",f2=function(){
//     Fichier2= fs.createWriteStream("fichier2.txt");
//     Fichier.pipe(Fichier2);

// });
// obj.emit("write");
// obj.emit("dup");

var event = require("events");
var fs = require("fs");

var obj = new event.EventEmitter();

obj.addListener("write", function(){
    fs.writeFile("WriteFile","Hello world from write event", function(err){
        if(err) {
            console.error(err);
            return;
        }
        console.log("File written successfully.");
    });
});

obj.addListener("dup", function(){
    var src = "./WriteFile";
    var des = "./CopiedFile";
    fs.link(src, des, function(err) {
        if(err) {
            console.error(err);
            return;
        }
        console.log("Hard link created successfully.");
    });
});

obj.emit("write");
obj.emit("dup");