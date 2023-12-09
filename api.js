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
var fileName = today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear() + "_lalunahoian.xlsx";
var fileNameBooking = today.getDate() + "-" + (today.getMonth()+1) + "-" + today.getFullYear() + "_lalunahoian_booking.xlsx";

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

const headerColumns = ["Name", "Email"];


router.route('/arrival').get((req, res) => {
    dboperations.getArrivalGuests().then(result => {
        res.json(result[0]);
    })
})


router.route('/departure').get((req, res) => {
    dboperations.getDepartureGuests().then(result => {
        res.json(result[0]);
    })
})

router.route('/').get((req, res) => {
    dboperations.getDepartureGuests().then(result => {
        data = result[0];
        data.push({Name: 'Red Nguyen', Email: 'rednguyen1997@gmail.com'});
        data.push({Name: 'Nancy Ha', Email: 'nancy.ha@lalunahoian.com'});
        console.log(data);
        const wb = new xl.Workbook();
        const ws = wb.addWorksheet("Laluna_Guest_Checkout");
        let colIndex = 1;
        headerColumns.forEach((item) => {
            ws.cell(1, colIndex++).string(item)
        })

        let rowIndex = 2;
        data.forEach((item) => {
        let columnIndex = 1;
        Object.keys(item).forEach((colName) => {
            ws.cell(rowIndex, columnIndex++).string(String(item[colName]));
        })
        rowIndex++;
        })

        wb.write(fileName);

        console.log("Completed!");
    })
    
})



var port = process.env.PORT || 8090;
app.listen((port), () => {
    dboperations.getDepartureGuests().then(result => {
        console.log("Generating file: " + fileName);
        data = result[0];
        data.push({Name: 'Red Nguyen', Email: 'rednguyen1997@gmail.com'});
        data.push({Name: 'Nancy Ha', Email: 'thaonguyen010295@gmail.com'});
        console.log(data);
        const wb = new xl.Workbook();
        const ws = wb.addWorksheet("Laluna_Guest_Checkout");
        let colIndex = 1;
        headerColumns.forEach((item) => {
            ws.cell(1, colIndex++).string(item)
        })

        let rowIndex = 2;
        data.forEach((item) => {
        let columnIndex = 1;
        Object.keys(item).forEach((colName) => {
            ws.cell(rowIndex, columnIndex++).string(String(item[colName]).trimStart());
        })
        rowIndex++;
        })
        wb.write(fileName);
        console.log("Completed!");
        // process.exit(0);
    });

    dboperations.getDepartureGuestsFromBooking().then(result => {
        console.log("Generating file: " + fileNameBooking);
        dataBooking  = result[0];
        dataBooking .push({Name: 'Red Nguyen', Email: 'rednguyen1997@gmail.com'});
        dataBooking .push({Name: 'Nancy Ha', Email: 'thaonguyen010295@gmail.com'});
        console.log(dataBooking );
        const wb = new xl.Workbook();
        const ws = wb.addWorksheet("Laluna_Guest_Checkout_Booking");
        let colIndex = 1;
        headerColumns.forEach((item) => {
            ws.cell(1, colIndex++).string(item)
        })

        let rowIndex = 2;
        dataBooking.forEach((item) => {
        let columnIndex = 1;
        Object.keys(item).forEach((colName) => {
            ws.cell(rowIndex, columnIndex++).string(String(item[colName]).trimStart());
        })
        rowIndex++;
        })
        wb.write(fileNameBooking);
        console.log("Completed!");
        // process.exit(1);
    });
});  