var express = require('express');

var connection = require(__dirname + '/model/database.js')
var router = express.Router()


//Read CSV File
var data = require("fs").readFileSync(__dirname + "/model/data_30.08.2022.csv", "utf8")
data = data.split("\r\n")

//Show number of rows in CSV
//console.log(data.length)
//Show number of rows in CSV

var Field_name;
var data_line = [];
for (var i = 0; i < data.length; i++) {
    data_line[i] = data[i].split(",")
    if (i == 0) {
        Field_name = data_line[0]
        //console.log(Field_name[0])
    }
    //console.log(data_line[0], data_line[2])
}
//Read CSV File

//console.log(data_line[500])
//Begin Create Table with Field's names from CSV

// Show Field Name
//console.log(Field_name)
// Show Field Name

var create_table_sql = "CREATE TABLE Test_Services ( ";
create_table_sql = create_table_sql + Field_name[0] + " varchar(128), `";
create_table_sql = create_table_sql + Field_name[1] + "` int(10), `";
create_table_sql = create_table_sql + Field_name[2] + "` varchar(255), `";
create_table_sql = create_table_sql + Field_name[3] + "` varchar(255), `";
create_table_sql = create_table_sql + Field_name[4] + "` varchar(128), `";
create_table_sql = create_table_sql + Field_name[5] + "` int(10), `";
create_table_sql = create_table_sql + Field_name[6] + "` int(10));";

// Print SQL Statement for create table (Services)
// console.log(create_table_sql)


// Query SQL Statement in Database for create Services's table
connection.query(create_table_sql, function (err, rows) {
    if (err) {
        req.flash('error', err)
    } else {
        console.log(rows);
    }
})
// Query SQL Statement in Database for create Services's table

//End Create Table with Field's names from CSV

//Begin Insert Data into Database
var insert_data_sql = "Insert into `Services` ( " + Field_name[0] + ", ";
insert_data_sql = insert_data_sql + " `" + Field_name[1] + "`, ";
insert_data_sql = insert_data_sql + " `" + Field_name[2] + "`, ";
insert_data_sql = insert_data_sql + " `" + Field_name[3] + "`, ";
insert_data_sql = insert_data_sql + " `" + Field_name[4] + "`, ";
insert_data_sql = insert_data_sql + " `" + Field_name[5] + "`, ";
insert_data_sql = insert_data_sql + " `" + Field_name[6] + "`) VALUES (";

for (var j = 1; j < data_line.length; j++) {
    //console.log(j)
    if (j == 1) {
        //insert_data_sql = insert_data_sql + j + ", '";
        insert_data_sql = insert_data_sql + "'" + data_line[j][0] + "', ";
        insert_data_sql = insert_data_sql + data_line[j][1] + ", ";
        insert_data_sql = insert_data_sql + " '" + data_line[j][2] + "', ";
        insert_data_sql = insert_data_sql + " '" + data_line[j][3] + "', ";
        insert_data_sql = insert_data_sql + " '" + data_line[j][4] + "', ";
        insert_data_sql = insert_data_sql + data_line[j][5] + ", ";
        insert_data_sql = insert_data_sql + data_line[j][6] + ")";
    } else {
        //insert_data_sql = insert_data_sql + ",(" + j + ", '";
        insert_data_sql = insert_data_sql + ",(";
        insert_data_sql = insert_data_sql + " '" + data_line[j][0] + "', ";
        insert_data_sql = insert_data_sql + data_line[j][1] + ", ";
        insert_data_sql = insert_data_sql + " '" + data_line[j][2] + "', ";
        insert_data_sql = insert_data_sql + " '" + data_line[j][3] + "', ";
        insert_data_sql = insert_data_sql + " '" + data_line[j][4] + "', ";
        insert_data_sql = insert_data_sql + data_line[j][5] + ", ";
        insert_data_sql = insert_data_sql + data_line[j][6] + ")";
        if (j == 2) {
            console.log(insert_data_sql);
        }
    }
    //console.log(data_line[j])
}
insert_data_sql = insert_data_sql + ";";
//console.log(insert_data_sql);

// Query Insert SQL Statement with data from csv into database
// connection.query(insert_data_sql, function (err, rows) {
//     if (err) {
//         console.log("error")
//         //req.flash('error', err)
//     } else {
//         console.log("\nInsert Successfully")
//         //console.log(rows);
//     }
// })
// Query Insert SQL Statement with data from csv into database


//End Insert Data into Database

//Test Select
// var sql = "SELECT `Zone`,COUNT(*) as ACCOUNTs  From Test_Services Group by `Zone` ORDER by `Zone`;";


// connection.query(sql, function (err, rows) {
//     if (err) {
//         //req.flash('error', err)
//         //res.render('profile', { data: '' })
//     } else {
//         console.log("\nTable Services already exist and ready to use.")
//         console.log(rows.length);
//         console.log(rows);
//         //res.render('home', { data: rows })
//     }
// })
//Test Select

// var sql = "SELECT *  From Test_Services LIMIT 10 ;";


// connection.query(sql, function (err, rows) {
//     if (err) {
//         //req.flash('error', err)
//         //res.render('profile', { data: '' })
//     } else {
//         console.log("\nTable Services ready to use.")
//         console.log(rows.length);
//         //console.log(rows);
//         //res.render('home', { data: rows })
//     }
// })




var app = express();

app.get('/', function (req, res, next) {
    var sql = "SELECT `Zone`,COUNT(*) as ACCOUNTs  From Services Group by `Zone` ORDER by `Zone`;";
    connection.query(sql, function (err, rows) {
        if (err) {
            //req.flash('error', err)
        } else {
            console.log("\nTable Services already exist and ready to use.")
            console.log(rows.length);
            console.log(rows);
        }
    })
    //res.sendFile(__dirname + "/" + "index.htm");
})

var server = app.listen(6000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("3BB app listening at http://%s:%s", host, port)
})