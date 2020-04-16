// jshint esversion: 6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelpCamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


//Setting up  a schema
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

let campground = mongoose.model("campground", campgroundSchema);

/* campground.create(
    {
        name: "Mountain Goat's Rest", 
        image: "https://maotchitim.org/wp-content/uploads/2019/07/camp-2587926_960_720.jpg"
    }, function(err, campground){
        if(err){
            console.log("there is an error", err);
        } else {
            console.log("successfully added ", campground);
        }
    }); */

/* let campgrounds = [
    {
        name: "Salmon Creek", 
        image: "https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg"},
    {
        name: "Granite Hill",
        image: "https://i.pinimg.com/originals/ff/81/4e/ff814e63495c488f692617ff11e3f784.jpg"},
    {
        name: "Mountain Goat's Rest", 
        image: "https://maotchitim.org/wp-content/uploads/2019/07/camp-2587926_960_720.jpg"}
];
 */





app.get("/", function(req, res){
    res.render("home");
});

app.get("/campgrounds", function(req, res){
    campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("error", err);
        } else {
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    })
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

app.post("/campgrounds", function(req, res){
    let newCampground = {name: req.body.name, image: req.body.image};
    campground.create(newCampground, function(err, campground){
        if(err) {
            console.log("error", err);
        } else {
            res.redirect("/campgrounds");
            console.log("added successfully", campground);
        }
    });
});
















app.listen(3000, function(){
    console.log("server is running..............");
});
