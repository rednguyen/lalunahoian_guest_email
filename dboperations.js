var config = require('./dbconfig');
const sql = require('mssql');

async function getArrivalGuests(){
    try{
        let pool = await sql.connect(config);
        let results = await pool.request().query(
        "select  a.LastName Name, a.MailM as Email, CONVERT(DATE, a.ArrivalDate) as Date from folio a join ActiveFolio b on a.FolioNum = b.FolioNum where convert(date, a.ArrivalDate) = CAST(GETDATE() AS DATE)"
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
        "select  a.LastName Name, a.MailM as Email, CONVERT(DATE, a.DepartureDate) as Date from folio a join ActiveFolio b on a.FolioNum = b.FolioNum where convert(date, a.DepartureDate) = CAST(GETDATE() AS DATE)"
        );
        return results.recordsets;
    }
    catch (error){
        console.log(error);
    }
}

module.exports ={
    getArrivalGuests : getArrivalGuests,
    getDepartureGuests: getDepartureGuests
}