const express = require("express");
const moment = require('moment'); // require
const fs = require("fs");


const app = express();

let now = new Date();
let hours = now.getHours();




var options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};



function sayHi(phrase, who) {
    console.log( phrase + ', ' + who + now );
}

function file(phrase, who) {
    fs.writeFile("hello.txt", "Начало зарядки: " + who, function(error){

        if(error) throw error; // если возникла ошибка
        console.log("Асинхронная запись файла завершена. Содержимое файла:");
        let data = fs.readFileSync("hello.txt", "utf8");
        console.log(data);  // выводим считанные данные
    });
}

console.log("Приложение запущено");

app.get("/", function(request, response){

    let now = new Date();
    response.send(now.toLocaleString("ru", options));
    console.log("get /");
});

app.get("/start", function(request, response){
    setTimeout(sayHi, 5000, "Привет", "Джон");
    response.send(now);
    console.log("start " + now );
    console.log(hours);
});

app.get("/file", function(request, response){
    // синхронное чтение
    console.log("Синхронное чтение файла")
    let fileContent = fs.readFileSync("hello.txt", "utf8");
    console.log(fileContent);
    response.send(fileContent);
});

app.get("/about", function(request, response){

    response.send("<h1>О сайте</h1>");
    console.log("get /about");
});

app.get("/contact", function(request, response){

    response.send("<h1>Контакты</h1>");
    console.log("get /contact");
});

app.get("/time", function(request, response){

    let mom = moment().locale("ru").format('HH:mm:ss');
    let mom2 = moment().add(4, 'hours').locale("ru").format('HH:mm:ss');
    response.send(mom + ' - ' + mom2);
    console.log(mom + " - " + mom2);
    console.log("--- --- ---");
    setTimeout(sayHi, 5000, "Привет ", mom);
    setTimeout(sayHi, 10000, "Привет2 ", mom);
    setTimeout(file, 15000, "Привет2 ", mom);
});



app.listen(process.env.PORT || 5000);