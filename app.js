// jshint esversion: 6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

let campgrounds = [
    {name: "Salmon Creek", image: "https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg"},
    {name: "Granite Hill", image: "https://i.pinimg.com/originals/ff/81/4e/ff814e63495c488f692617ff11e3f784.jpg"},
    {name: "Mountain Goat's Rest", image: "https://maotchitim.org/wp-content/uploads/2019/07/camp-2587926_960_720.jpg"}
];


app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/campgrounds", function(req, res){
    
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

app.post("/campgrounds", function(req, res){
    let newCampground = {name: req.body.name, image: req.body.image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
    
});
















app.listen(3000, function(){
    console.log("server is running..............");
});