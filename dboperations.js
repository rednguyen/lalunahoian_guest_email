var config = require('./dbconfig');
const sql = require('mssql');

async function getArrivalGuests(){
    try{
        let pool = await sql.connect(config);
        let results = await pool.request().query(
        "select  a.LastName Name, a.MailM as Email from folio a join ActiveFolio b on a.FolioNum = b.FolioNum where convert(date, a.ArrivalDate) = CAST(GETDATE() AS DATE)"
        );
        return results.recordsets;
    }
    catch (error){
        console.log(error);
    }
}

async function getDepartureGuests(){
    try{
        let pool = await sql.connect(config);
        let results = await pool.request().query(
        "select LTRIM(FirstName + ' ' + LastName) as Name,MailM as Email from folio  where convert(date, DepartureDate) = CAST(GETDATE() AS DATE) and checkInTime is not NULL and CreditCardHolder <> 'Booking.com' and CreditCardHolder <> 'Agoda'"
        );
        return results.recordsets;
    }
    catch (error){
        console.log(error);
    }
}

async function getDepartureGuestsFromBooking(){
    try{
        let pool = await sql.connect(config);
        let results = await pool.request().query(
        "select  LTRIM(FirstName + ' ' + LastName) as Name,MailM as Email from folio  where convert(date, DepartureDate) = CAST(GETDATE() AS DATE) and checkInTime is not NULL and CreditCardHolder = 'Booking.com'"
        );
        return results.recordsets;
    }
    catch (error){
        console.log(error);
    }
}


async function getDepartureGuestsFromAgoda(){
    try{
        let pool = await sql.connect(config);
        let results = await pool.request().query(
        "select  LTRIM(FirstName + ' ' + LastName) as Name,MailM as Email from folio  where convert(date, DepartureDate) = CAST(GETDATE() AS DATE) and checkInTime is not NULL and CreditCardHolder = 'Agoda'"
        );
        return results.recordsets;
    }
    catch (error){
        console.log(error);
    }
}


module.exports ={
    getArrivalGuests : getArrivalGuests,
    getDepartureGuests: getDepartureGuests,
    getDepartureGuestsFromBooking: getDepartureGuestsFromBooking,
    getDepartureGuestsFromAgoda: getDepartureGuestsFromAgoda
}