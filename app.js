var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	yql = require('yql');

	var cityName = "austin, tx"; //default city name
	

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function(req,res){

	var query = new yql('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + cityName + '")');
	
	query.exec(function(err, data) {
	  var location = data.query.results.channel.location;
	  var condition = data.query.results.channel.item.condition;
	  res.render("home", {location:location, condition: condition});
	});		

});

app.post("/newCity", function(req,res){
	cityName = req.body.cityInputName;
	res.redirect("/");
})

app.listen(process.env.PORT, process.env.IP, function(req,res){
	console.log("weather api server running!")
});