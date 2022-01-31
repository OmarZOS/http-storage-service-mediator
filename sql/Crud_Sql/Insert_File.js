const xlsxFile = require('read-excel-file/node');

async function insert_File(path, table, schema_table, schema_file, usr, well, date_insertion) {

    var json = {
        "request_Type": "record",
        "destination": "sql",
        "operation": "insert",
        "data": [{
            "table": ["daily_data"],
            "attribut_select": [],
            "attribut": [],
            "valeur": [],
            "condition": []
        }]
    }

    const a = 8

    var obj_wells;
    var j = [];

    var sh = Nbre_Sheet(path);

    for (let i = 0; i < sh.length; i++) {

        xlsxFile(path, { sheet: sh[i] }).then((rows) => {

            json.data[0].table = table;
            json.data[0].valeur = rows;
            json.data[0].attribut = schema_file;

            json.data[0].attribut_select = schema_table;
            console.log("aliali")
            Add_Sheet(json)

        })
    }

}

async function Nbre_Sheet(path) {
    var xlsx = require('node-xlsx');
    var sh = []

    const worksheetsArray = xlsx.parse(path); // parses a file
    worksheetsArray.forEach(sheet => {
        console.log(sheet.name);
        sh.push(sheet.name)
    })
    console.log("aaaaa");
    return sh

}

async function Add_Sheet(json, usr, well, date_insertion) {
    console.log("add")

    const startSql = require('./Connexion/startconnect')

    var connect = startSql.connexion;
    for (let i = 1; i < json.data[0].valeur.length; i++) {
        let req = create_req(json, i, usr, well, date_insertion);
        console.log(req);
        //req="select * from Daily_Data" 

        connect.query(req, (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
        });

    }
    connect.end();

}

async function create_req(json, k, usr, well, date_insertion) {

    var req = '';
    req = req + 'insert into ';
    console.log("k" + k + json.data[0].valeur[k])
    req = req + json.data[0].table + ' values ( ';
    req = req + " " + k + " , ";
    req = req + " " + well + " , ";
    req = req + " " + usr + " , ";
    for (let i = 0; i < json.data[0].attribut.length; i++) {
        if (json.data[0].attribut[i] == "START_DATE") {


            var h = index(json.data[0].attribut[i], json.data[0].valeur[0])


            req = req + " '" + new Date(json.data[0].valeur[k][0]).getFullYear() + '-' + new Date(json.data[0].valeur[k][0]).getMonth() + 1 + '-' + new Date(json.data[0].valeur[k][0]).getDate() + "' , "

        } else {

            var h = index(json.data[0].attribut[i], json.data[0].valeur[0])
            if (h == -1) {
                req = req + " '" + 0 + "' , ";

            } else {
                req = req + " '" + json.data[0].valeur[k][h] + "' , ";
            }

        }

    }

    req = req + "'" + date_insertion + " ' ";
    req = req + " )";

    return req;
}

async function index(val, json) {
    for (let i = 0; i < json.length; i++) {

        if (json[i] == val) {


            return i;
        }

    }

    return -1;

}