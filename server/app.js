/**
 * Created by Dave on 10/2/15.
 */
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var jsonquery = require('json-query');
var tech = require('../models/tech.json');

var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
//Establish to-do list json location
var fileLocation = path.join(__dirname, '../models/to_do.json');

//Create server here
var server = app.listen(process.env.PORT || 3000, function(){
    var port = server.address().port;
    console.log("Listening on port: " + port);
})

//get index.html served
app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/views/index.html");
});

//get list of technologies for header
app.get("/tech", function(req, res){
    res.json(tech);
});

//get to-do list items
app.get("/:techName?", function(req, res){

    var techName = req.params.techName;

    fs.readFile(fileLocation, function(err, data){
        var obj = JSON.parse(data);

        var query = getJsonQueryString("techName", techName);

        if(techName){
            var technology = jsonquery(query, {data: obj});
            res.json(technology);
        } else {
            res.send(obj);
        }
    });
});

//get JsonQueryString
function getJsonQueryString(key, value){
    var queryString = '[' + key + '=' + value + ']';
    //console.log('Generate query string: ' + queryString);
    return queryString;
};

//ADD IN A POST AND CONSOLE LOG WHATEVER COMES OUT
app.post("/add", function(req, res){
    console.log(req);
})


module.exports = app;