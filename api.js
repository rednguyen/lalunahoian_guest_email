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
var fileName = today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear() + "_lalunahoian_trip.csv";
var fileNameBooking = today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear() + "_lalunahoian_booking.csv";
var fileNameAgoda = today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear() + "_lalunahoian_agoda.csv";
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
        data.push({Name: 'Red Nguyen', Email: 'rednguyen1997@gmail.com'});
        data.push({Name: 'Nancy Ha', Email: 'thaonguyen010295@gmail.com'});
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
        dataBooking.push({Name: 'Red Nguyen', Email: 'rednguyen1997@gmail.com'});
        dataBooking.push({Name: 'Nancy Ha', Email: 'thaonguyen010295@gmail.com'});
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
        dataAgoda.push({Name: 'Red Nguyen', Email: 'rednguyen1997@gmail.com'});
        dataAgoda.push({Name: 'Nancy Ha', Email: 'thaonguyen010295@gmail.com'});
        console.log(dataAgoda);
        const jsonData = JSON.parse(JSON.stringify(dataAgoda));

        fastcsv
        .write(jsonData, { headers: true })
        .pipe(wsAgoda);
    });

});  