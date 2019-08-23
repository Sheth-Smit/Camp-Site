var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");
var rp = require("request-promise");
var $ = require("cheerio");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campsiteSchema = new mongoose.Schema({
  name: String,
  image: String,
  location: String,
  desc: String
});

var Campsite = mongoose.model("Campsite", campsiteSchema);

// Campsite.create({
//   name: "Camp Exotica",
//   image: "https://www.holidify.com/images/cmsuploads/compressed/tent-1208201_1920_20190212172038.jpg",
//   location: "Kullu",
//   desc: "The Camp Exotica is a perfect weekend getaway option located in Kullu in the Manali district of Himachal Pradesh. The accommodation provided is world class and the tents simply leave you connecting with nature like never before. The location of these tents is such that it gives a panoramic view of the surrounding mountains. The food provided is of fine quality and the incredible view will simply leave you in awe of this adventure. Make sure to take out time for this pleasure full camping trip."
// }, function(err, newCampsite){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Added...");
//     console.log(newCampsite);
//   }
// });


// const url = "https://www.holidify.com/collections/camping-in-india";
//
// rp(url)
//   .then(function(html){
//     var nameData = $('.result > h2', html);
//     var n = nameData.length;
//     var imgData = $('.result > .collImgContainer > img',html);
//
//     for( var i=0; i<n; i++){
//       var name = nameData[i].children[0].data.split(",")[0];
//       var location = nameData[i].children[0].data.split(",")[1];
//       var img = imgData[i].attribs["data-original"];
//       var campsite = {
//         name: name,
//         image: img,
//         location: location
//       };
//       campsites.push(campsite);
//     }
//
//   })
//   .catch(function(err){
//     console.log("Error occurred while fetching data...", err);
//   });

// var campsites = [
//   { name: "Tso Moriri Lake",
//     image: "https://www.holidify.com/images/cmsuploads/compressed/640px-Tsomoriri_Lake_DSC4010_20190212171119.jpg",
//     location: "Ladakh"
//   },
//   { name: "Camp Exotica",
//     image: "https://www.holidify.com/images/cmsuploads/compressed/tent-1208201_1920_20190212172038.jpg",
//     location: "Kullu"
//   },
//   { name: "Rishikesh Valley camp",
//     image: "https://www.holidify.com/images/cmsuploads/compressed/3418318319_6caa7d0cfe_z_20190212173233.jpg",
//     location: "Rishikesh"
//   },
//   { name: "Tso Moriri Lake",
//     image: "https://www.holidify.com/images/cmsuploads/compressed/640px-Tsomoriri_Lake_DSC4010_20190212171119.jpg",
//     location: "Ladakh"
//   },
//   { name: "Camp Exotica",
//     image: "https://www.holidify.com/images/cmsuploads/compressed/tent-1208201_1920_20190212172038.jpg",
//     location: "Kullu"
//   },
//   { name: "Rishikesh Valley camp",
//     image: "https://www.holidify.com/images/cmsuploads/compressed/3418318319_6caa7d0cfe_z_20190212173233.jpg",
//     location: "Rishikesh"
//   },
//   { name: "Tso Moriri Lake",
//     image: "https://www.holidify.com/images/cmsuploads/compressed/640px-Tsomoriri_Lake_DSC4010_20190212171119.jpg",
//     location: "Ladakh"
//   },
//   { name: "Camp Exotica",
//     image: "https://www.holidify.com/images/cmsuploads/compressed/tent-1208201_1920_20190212172038.jpg",
//     location: "Kullu"
//   },
//   { name: "Rishikesh Valley camp",
//     image: "https://www.holidify.com/images/cmsuploads/compressed/3418318319_6caa7d0cfe_z_20190212173233.jpg",
//     location: "Rishikesh"
//   }
// ];

app.get("/", function(req, res){
  res.render("home");
});

app.get("/campsites", function(req, res){
  Campsite.find({}, function(err, allCampsites){
    if(err){
      console.log(err);
    } else {
      res.render("campsites", {campsites: allCampsites} );
    }
  });

});

app.post("/campsites", function(req, res){
  var name = req.body.name;
  var location = req.body.location;
  var image = req.body.image;
  var desc = req.body.desc;

  Campsite.create({
    name: name,
    location: location,
    image: image,
    desc: desc
  }, function(err, newCampsite){
    if(err){
      console.log(err);
    } else {
      console.log("Added...");
      console.log(newCampsite);
    }
  });


  
  res.redirect("/campsites");
});

app.get("/campsites/new", function(req, res){
  res.render("new");
});

app.get("/campsites/:id", function(req, res){
  Campsite.findById(req.params.id, function(err, campsite){
    if(err){
      console.log(err);
    } else {
      res.render("show", {campsite: campsite});
    }
  });
});

app.listen(3000, function(){
  console.log("Yelp Camp Application started...");
});
