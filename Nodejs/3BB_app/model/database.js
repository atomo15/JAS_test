var mysql = require('mysql');

//Connect MySQL Database
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "3BB"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});

module.exports = con
//Connect MySQL Database