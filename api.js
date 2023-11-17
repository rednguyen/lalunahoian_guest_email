const dboperations = require('./dboperations');
const Guest = require('./guest');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);



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
    res.json({"Name" : "RedNguyen"});
})



var port = process.env.PORT || 8090;
app.listen(port);