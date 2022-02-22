const schema = require('./sql/schema')
const constants = require('./constants')
const hdfs = require('./hdfs/Hdfs')

const requestResolver = async(json) => {

    switch (json.modelType) {
        case "sql":

            break;
        case "hdfs":

            break;
        case "spark":

            break;

        default:
            break;
    }

    if (json.modelType == "sql") {
        // console.log("sql");

        if (json.request_Type == "record") {

            const req = await get_requete(json);
            console.log("requete : " + req);

            if (req == '') {
                throw constants.EMPTY_QUERY_ERROR_MESSAGE;
            } else {
                return await schema.getData(req, (error, results, fields) => {
                    if (error) { throw constants.FETCH_DATA_ERROR_MESSAGE + " " + error; }
                    return results;
                }).catch(err => {
                    throw err;
                });

            }
        } else { //in case of a File, already done in the web component


        }



    } else {
        //Connection HDFS
        return 'Es ist getan'
    }
}

function get_json() {

    var json = {
        "request_Type": "record",
        "destination": "sql",
        "operation": "select",
        "data": [{
            "table": ["bac"],
            "attribut_Select": ["ID_BAC", "NOM_BAC"],
            "attribut": ["ID_BAC", "NOM_BAC"],
            "valeur": ["1", "hassi Mes3oud"],
            "condition": ["=", "="]
        }]
    }
    return json;
}

const get_requete = async(json) => {
    var req = '';
    try {
        switch (json.operation) {
            case 'select':
                req = req + json.operation + ' ';

                //Attribut selected

                for (let i = 0; i < json.data[0].attribut_Select.length; i++) {
                    req = req + json.data[0].attribut_Select[i];
                    if (i < json.data[0].attribut_Select.length - 1) {
                        req = req + ' , '
                    }

                }
                req = req + ' from '

                for (let i = 0; i < json.data[0].table.length; i++) {
                    req = req + json.data[0].table[i];
                    if (i < json.data[0].table.length - 1) {
                        req = req + ' , '
                    }

                }

                if (json.data[0].valeur.length > 0) {
                    req = req + " where ";
                    for (let i = 0; i < json.data[0].valeur.length; i++) {
                        req = req + json.data[0].attribut[i] + ' ' + json.data[0].condition[i] + ' "' + json.data[0].valeur[i] + '" ';
                        if (i < json.data[0].condition.length - 1) {
                            req = req + ' and '
                        }
                    }
                }
                req = req + (" ;")
                return req;
                break;

            case 'insert':
                // Attention si id est auto incremente commencer la boucle par 1
                req = req + json.operation + ' into ';
                req = req + json.data[0].table[0] + ' values ( ';
                for (let i = 0; i < json.data[0].valeur.length; i++) {
                    req = req + " '" + json.data[0].valeur[i] + "' ";
                    if (i < json.data[0].valeur.length - 1) {
                        req = req + ' , '
                    }
                }
                req = req + " )";
                return req;
                break;

            case 'update':

                break;
            case 'delete':

                break;
            case 'raw':

                break;

            default:
                break;
        }


    } catch (error) {
        throw constants.QUERY_BUILD_ERROR_MESSAGE;
    }
}

module.exports = {
    requestResolver
}