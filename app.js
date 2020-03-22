// jshint esversion: 6
const express = require("express");
const app = express();



app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});
app.get("/campgrounds", function(req, res){
    let campgrounds = [
        {name: "Salmon Creek", image: "https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg"},
        {name: "Granite Hill", image: "https://i.pinimg.com/originals/ff/81/4e/ff814e63495c488f692617ff11e3f784.jpg"},
        {name: "Mountain Goat's Rest", image: "https://maotchitim.org/wp-content/uploads/2019/07/camp-2587926_960_720.jpg"}
    ];
    res.render("campgrounds", {campgrounds: campgrounds});
});















app.listen(3000, function(){
    console.log("server is running..............");
});