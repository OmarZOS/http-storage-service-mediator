const bcrypt = require('bcrypt');
var mysql = require('mysql');
var dbConnection = mysql.createConnection({
    host: "localhost",
    user: "crafterZos",
    password: "crafterZos",
    database: "sonatrachproduction",
    port: 8080
});
dbConnection.connect(async function(err) {
    if (err) throw err;
    console.log("Connected MySQL Database!");
    // const hashedPass = await bcrypt.hash('secret', 5);
    // // console.log(hashedPass);
    // var sql = "INSERT INTO USER (NOM_USER,PRENOM_USER,PASSWORD,EMAIL,CREATED_AT,UPDATE_AT,VERIFIED_AT,JOUR_ENREGISTREMENT) VALUES ('Nobody', 'Knows','" + hashedPass + "', 'nemo@outis.com', 'Current_Time()','Current_Time()','Current_Time()','Current_Time()')";
    // con.query(sql, function(err, result) {
    //     if (err) throw err;
    //     console.log("1 record inserted");
    // })
})




module.exports = {
    dbConnection
}



// INSERT INTO USER (NOM_USER,PRENOM_USER,PASSWORD,EMAIL,CREATED_AT,UPDATE_AT,VERIFIED_AT,JOUR_ENREGISTREMENT) VALUES ('Nobody', 'Knows','$2b$05$Gt.Tc4w4ObkRRErUdii6t.jVZQ3LnqhRasLopdZ6fdqEXTlYf167q', 'nemo@outis.com',Current_Time(),Current_Time(),Current_Time(),Current_Time())