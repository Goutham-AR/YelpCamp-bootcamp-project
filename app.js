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
    image: String,
    description: String
});

// modeling the created schema into a collection
let campground = mongoose.model("campground", campgroundSchema);


/* 
campground.create({
    name: "Granite Hill",
    image: "https://wusfnews.wusf.usf.edu/sites/wusf/files/styles/x_large/public/202003/florida_state_parks_camping_fsp.jpg",
    description: "This is a famous camping place high above the hill."
}, function(err, newCamp) {
    if(err) {
        console.log(err, "error");
    } else {
        console.log(newCamp);
    }
});
 */



// Routes
//--------------------

app.get("/", function(req, res){
    res.render("home");
});

// INDEX
app.get("/campgrounds", function(req, res){
    campground.find({}, function(err, allCampgrounds){                      // retrieving all datas from the database to render....
        if(err){
            console.log("error", err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

// NEW
app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

// CREATE 
app.post("/campgrounds", function(req, res){
    let newCampground = {name: req.body.name, image: req.body.image, description: req.body.description };
    campground.create(newCampground, function(err, campground){             // add new documents into the collection
        if(err) {
            console.log("error", err);
        } else {
            res.redirect("/campgrounds");
            console.log("added successfully", campground);
        }
    });
});

// SHOW --- show more info about one campground.......
app.get("/campgrounds/:id", function(req, res){
    // console.log(req.params);
    campground.findById(req.params.id, function(err, camp) {
        if(err) {
            console.log(err, "error");
        } else {
            res.render("show", {campground: camp});
        }
    });
});
















app.listen(3000, function(){
    console.log("server is running..............");
});
