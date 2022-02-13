var express = require('express');
var cors = require('cors')
var app = express();
var fs = require("fs");

app.use(cors())

app.get('/people', function (req, res) {
    fs.readFile(__dirname + "/" + "people.json", 'utf8', function (err, data) {
        const resultData = JSON.parse(data);
        res.end(JSON.stringify(resultData.people));
    });
})

app.get('/people/:id', function (req, res) {
    fs.readFile(__dirname + "/" + "people.json", 'utf8', function (err, data) {
        const id = req.params.id;
        const resultData = JSON.parse(data);
        let selectedPeopleDetails;
        for(let i=0;i<resultData?.people.length;i++){
            if(resultData?.people[i].id == id){
                selectedPeopleDetails = resultData.people[i];
                break;
            } 
        }
        console.log("selected people details", selectedPeopleDetails)
        res.end(JSON.stringify(selectedPeopleDetails))
    });
})

var server = app.listen(8081,'localhost', function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})