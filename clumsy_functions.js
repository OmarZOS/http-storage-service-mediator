
// These functions were written by Lamri Ali, I supervised most of them and optimised some of them    



require('dotenv').config({
    path: `./env-files/production.env`,
});

const api = require('./sql/db/index')


function index(val, json) {
    for (let i = 0; i < json.length; i++) {

        if (json[i] == val) {
            return i;


        }

    }
    return -1;



}

function Attribut_Inserer(req, Schema_table) {


    for (let i = 0; i < Schema_table.length; i++) {
        req = req + " " + Schema_table[i] + " "
        if (i < Schema_table.length - 1) {
            req = req + " , ";

        }

    }
    return req;
}


function create_reqj(rows, k, usr, well, DATE_INSERTION, Schema_table) {

    if (Check_Jauge(rows, 6, 2, 3, 1, k) == 0) {
        return ''

    } else {

        var req = '';
        req = req + 'insert into ';
        req = req + " JAUGAGE_DATA ( ";
        req = Attribut_Inserer(req, Schema_table);
        // console.log(req);
        req = req + ')  values ( ';


        req = req + " '" + well + "' , ";
        req = req + " '" + usr + "' , ";

        req = req + " '" + rows[k][2] + "' ,"
        req = req + " '" + rows[k][3] + "' ,"

        req = req + " '" + rows[k][6] + "' ,"
        req = req + " '" + rows[k][6] * rows[k][9] + "' ,"
        req = req + " '" + 0 + "' ," ///debit water

        req = req + " '" + rows[k][9] + "' ," //glr
        req = req + " '" + rows[k][9] + "' ,"

        req = req + " '" + 0 + "' ,"
        req = req + " '" + DATE_INSERTION + "' , "
        req = req + " ' " + new Date(rows[k][0]).getFullYear() + '-' + (new Date(rows[k][0]).getMonth() + 1) + '-' + new Date(rows[k][0]).getDate() + " ' ,"
        req = req + " '" + rows[k][1] + "' "

        req = req + " )";

        return req;
    }

}

/*********************************DAily */

const LAST_GLR_MEASURED_REQUEST = "SELECT ID_PUIT, GLR FROM JAUGAGE_DATA AS a WHERE DATE_JAUG = ( SELECT MAX(DATE_JAUG) FROM JAUGAGE_DATA AS b WHERE a.ID_PUIT = b.ID_PUIT  );"
var index = {}

const create_req = (rows, k, usr, well, DATE_INSERTION, Schema_table) => {

        if (Check_Day(rows, 9, 6, 5, 4, k) == 0) {
            return ''

        } else {

            var req = '';
            req = req + 'insert into ';
            // console.log("k"+k+ json.data[0].valeur[k])
            req = req + " DAILY_DATA ( ";
            req = Attribut_Inserer(req, Schema_table);
            req = req + ')  values ( ';

            //req=req+" '"+1+"' , ";//model

            req = req + " '" + 1 + "' , ";
            req = req + " '" + well + "' , ";
            req = req + " '" + usr + "' , ";

            req = req + " ' " + new Date(rows[k][0]).getFullYear() + '-' + (new Date(rows[k][0]).getMonth() + 1) + '-' + new Date(rows[k][0]).getDate() + " ' , "

            req = req + " '" + rows[k][6] + "' ,"
            req = req + " '" + rows[k][5] + "' ,"
            req = req + " '" + rows[k][4] + "' ,"
            req = req + " '" + 0 + "' ,"
            req = req + " '" + rows[k][11] + "' ,"
            req = req + " '" + rows[k][8] + "' ,"
            req = req + " '" + DATE_INSERTION + " '  ,"

            // let [data] = await api.raw(`SELECT glr from JAUGAGE_DATA where ID_PUIT=${well} order by DATE_JAUG desc limit 1`)

            let g_l_r = index[`${well}`]
                // console.log(g_l_r)
                // let g_l_r = 0;

            // console.log("glr: " + g_l_r)

            var Delta_p = rows[k][5] - rows[k][6];
            var Diam = rows[k][4];
            var gilbert_value = Gilbert(0.000386, 0.546, 1.89, g_l_r, Math.abs(Delta_p), Diam)
            req = req + " '" + gilbert_value * rows[k][11] + " '  "

            req = req + " )";
            return req;
        }
    }
    /**ADD SHEETS***************************** */

async function Add_Sheet(rows, usr, element, DATE_INSERTION, Schema_table) {



    for (let i = 1; i < rows.length; i++) {

        //Verifier req c.a.d Verifier POint de Données

        let req = await create_req(rows, i, usr, element, DATE_INSERTION, Schema_table);

        if (req == '') {
            console.log("Point eliminer");

        } else {
            // console.log(req);

            api.raw(req, (error, results, fields) => {
                if (error) {
                    return console.error(error.message);
                }


            });


        }
    }
}


/************************************ */

const insert_File = async(path, usr, elemen, Schema_table, DATE_INSERTION) => {

        let [data] = await api.raw(LAST_GLR_MEASURED_REQUEST)


        // console.log(data)
        for (var i = 0; i < data.length; i++) {
            // console.log(Field)
            // console.log(data[i])
            index[data[i].ID_PUIT] = data[i].GLR
                // console.log(data[i].ID_PUIT)

        }
        // console.log(index)

        const xlsxFile = require('read-excel-file/node');
        var sh = List_Sheet(path);

        for (let i = 0; i < 5; i++) { //sh.length
            xlsxFile(path, { sheet: sh[i] }).then(async(rows) => {
                await Add_Sheet(rows, usr, i + 1, DATE_INSERTION, Schema_table)

            })
        }

    }
    /********************Nbre SHeet */

function List_Sheet(path) {
    var xlsx = require('node-xlsx');
    var sh = []
    const worksheetsArray = xlsx.parse(path); // parses a file
    worksheetsArray.forEach(sheet => {

        // console.log(sheet.name)
        sh.push(sheet.name)
    })


    return sh;
}

/******************************* Verifier point data */

// JAUGAGE
function Check_Jauge(row, Q0, pipe, tete, choke, indice) {
    if (row[indice][tete] == undefined || row[indice][Q0] == undefined)

    {
        console.log("alialailai indice" + indice)
        return 0
    }

    if (row[indice][pipe] == undefined) {
        if (row[indice][choke] == 0) {
            row[indice][pipe] = row[indice][tete] - 1

        } else {
            console.log("zzzzzzzzz indice")


            return 0
        }


    }


    if (row[indice][choke] == 0) {
        row[indice][choke] == 50

    }
    return 1;

}


// Daily
function Check_Day(row, Q0, pipe, tete, choke, indice) {
    //wlp=undefined
    if (row[indice][pipe] == undefined) {
        console.log("wlp=undefined")
        return 0
    }
    //wlh=undefind
    if (row[indice][tete] == undefined) {
        if (row[indice][choke] == row[indice - 1][choke] && row[indice][pipe] == row[indice - 1][pipe] && row[indice][Q0] == row[indice - 1][Q0]) {
            row[indice][tete] = row[indice + 1][tete]

        } else {
            if (row[indice][choke] == row[indice + 1][choke] && row[indice][pipe] == row[indice + 1][pipe] && row[indice][Q0] == row[indice + 1][Q0]) {
                row[indice][pipe] = row[indice + 1][tete]


            }
        }
    }
    //wlp=wlh
    if (row[indice][tete] == row[indice][pipe]) {
        row[indice][pipe] == row[indice][tete - 1]
    }
    return 1;

}



function Gilbert(a, b, c, Glr, p, Diam) {
    return ((a * Math.pow(Diam, b) * p) / (Math.pow(Glr, c)));
}

///////////////////////////////////////////////////


//Jauge  ["ID_PUIT","id_user", "PRESSION_PIPE_JAUG","PRESSION_TETE_JAUG","DEBIT0","DEBIT_GAS"," DEBIT_WATER","GLR","GOR","TEMPERATURE","DATE_INSERER_JAUG","Date_Jauge"]
//Daily "id_user","ID_PUIT","date_DAILY_DATA","PRESSION_PIP_D","PRESSION_TETE_D","Diametre","temperature","AH","GOR_DAILY","DATE_INSERTION"  
//MEsure Bac ["nom_bac","DS","Date_Mesure_Bac"]

// Nbre_Sheet('./JAUGEAGE_DATA_WELLs.xlsx');  

async function importDailyDataFromFile(filename) {
    console.log('calling');
    await insert_File('./DAILY_DATA_WELLs.xlsx', 1, 1, ["ID_MODEL", "ID_PUIT", "ID_USER", "DATE_DAILY_DATA", "PRESSION_PIP_D", "PRESSION_TETE_D", "DIAMETRE", "TEMPERATURE", "AH", "GOR_DAILY", "DATE_INSERTION", "VOLUME"], '2022-01-29');
    console.log("Fertig!!");
    // expected output: "resolved"
}


module.exports = {
    importDailyDataFromFile
}

//insert_File('./JAUGEAGE_DATA_WELLs.xlsx',1,1, ["ID_PUIT","id_user", "PRESSION_PIPE_JAUG","PRESSION_TETE_JAUG","DEBIT0","DEBIT_GAS"," DEBIT_WATER","GLR","GOR","TEMPERATURE","DATE_INSERER_JAUG","Date_Jauge","Diametre"],'2022-01-29');
