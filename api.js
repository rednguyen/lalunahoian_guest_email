const dboperations = require('./dboperations');
const Guest = require('./guest');
const xl = require('excel4node');
const today = new Date();

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();
var data = [];
var dataBooking = [];
var fileName = "lalunahoian_trip.csv";
var fileNameBooking = "lalunahoian_booking.csv";
var fileNameAgoda = "lalunahoian_agoda.csv";
const fastcsv = require("fast-csv");
const fs = require("fs");


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

const headerColumns = ["Name", "Email"];



var port = process.env.PORT || 8090;
app.listen((port), () => {
    dboperations.getDepartureGuests().then(result => {
        ws = fs.createWriteStream(fileName);
        console.log("Generating file: " + fileName);
        data = result[0];
        console.log(data);
        const jsonData = JSON.parse(JSON.stringify(data));

        fastcsv
        .write(jsonData, { headers: true })
        .pipe(ws);
    });

    dboperations.getDepartureGuestsFromBooking().then(result => {
        wsBooking = fs.createWriteStream(fileNameBooking);
        console.log("Generating file: " + fileNameBooking);
        dataBooking  = result[0];
        console.log(dataBooking);
        const jsonData = JSON.parse(JSON.stringify(dataBooking));

        fastcsv
        .write(jsonData, { headers: true })
        .pipe(wsBooking);
    });

    dboperations.getDepartureGuestsFromAgoda().then(result => {
        wsAgoda = fs.createWriteStream(fileNameAgoda);
        console.log("Generating file: " + fileNameAgoda);
        dataAgoda  = result[0];
        console.log(dataAgoda);
        const jsonData = JSON.parse(JSON.stringify(dataAgoda));

        fastcsv
        .write(jsonData, { headers: true })
        .pipe(wsAgoda);
    });

});  