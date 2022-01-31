function index(val, json) {
    for (let i = 0; i < json.length; i++) {

        if (json[i] == val) {
            return i;
        }
    }
    return -1;
}

function Attribut_Inserer(req, table_schema) {

    for (let i = 0; i < table_schema.length; i++) {
        req = req + " " + table_schema[i] + " "
        if (i < table_schema.length - 1) {
            req = req + " , ";
        }
    }
    return req;
}

function create_req(rows, k, usr, element, table_name, table_schema, file_schema, date_insertion) {

    var req = '';
    req = req + 'insert into ' + table_name + " (";
    req = Attribut_Inserer(req, table_schema);
    req = req + ')  values ( ';


    //id 
    req = req + " " + usr + " , ";
    req = req + " '" + element + "' , ";
    req = req + " '" + new Date(rows[k][0]).getFullYear() + '-' + new Date(rows[k][0]).getMonth() + 1 + '-' + new Date(rows[k][0]).getDate() + "' , "
    req = req + " " + rows[k][6] + " ,"
    req = req + " " + rows[k][5] + " ,"
    req = req + " " + rows[k][4] + " ,"
    req = req + " " + 0 + " ,"
    req = req + " " + rows[k][11] + " ,"
    if (rows[k][8] == undefined) {
        req = req + " " + 0 + " ,"


    } else {
        req = req + " " + rows[k][8] + " ,"
    }

    req = req + " '" + date_insertion + "' "



    req = req + " )";

    return req;
}

async function insert_File(path, user, date_insertion, table_schema, table_name, file_schema) {

    const xlsxFile = require('read-excel-file/node');

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

    var obj_wells;
    var j = [];

    // console.log(ab)
    Nbre_Sheet(path, user, date_insertion, table_schema, table_name, file_schema);

}

async function Nbre_Sheet(path, user, date_insertion, table_schema, table_name, file_schema) {
    var xlsx = require('node-xlsx');
    var data = [];
    var name = [];
    var req;
    //var sh=[]
    const xlsxFile = require('read-excel-file/node');

    const worksheetsArray = xlsx.parse(path); // parses a file
    worksheetsArray.forEach(sheet => {

        data.push(sheet.data);
        name.push(sheet.name)

    })
    const startSql = require('../Connexion/startconnect')

    for (let k = 1; k < 3; k++) {

        // req=Add_Sheet(data[k],user,name[k],table_name,table_schema,file_schema,date_insertion);
        var connect = startSql.connexion;

        for (let i = 1; i < data[k].length; i++) {

            req = create_req(data[k], i, user, name[k], table_name, table_schema, file_schema, date_insertion);
            //console.log(new Date(data[k][0]).getFullYear() +'-'+new Date(data[k][0]).getMonth()+1+'-'+new Date(data[k][0]).getDate())           
            connect.query(req, (error, results, fields) => {
                if (error) {
                    return console.error(error.message);
                }


            });

        }

    }
}