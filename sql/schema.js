const api = require('./db/index');

const constants = require('../constants')

const schema = undefined

const schemaDetails = {}


getDataBaseSchema = async() => {


    if (schema) //if already fetched..
        return { schema }

    [schema] = await api
        .raw(`SELECT * FROM information_schema.tables 
                    WHERE table_schema=${process.env.SQL_DATABASE};`, (err, res, field) => {
            if (err) throw constants.DATABASE_SERVER_ERROR
        })

    console.log(schema);
    if (!schema) {
        return constants.FETCH_SCHEMA_ERROR_MESSAGE;
    }

    return {
        schema
    };
}

getTableDetails = async(tableName) => {

    if (schemaDetails.tableName) //if already fetched..
        return { data: schemaDetails.tableName }

    const [table] = await api.raw(`DESC ${tableName};`, (err) => { if (err) throw constants.FETCH_DETAILS_ERROR_MESSAGE });

    // console.log("found schema details");

    var data = {}

    //casting it to k/v pairs
    for (var i = 0; i < table.length; i++) {
        if (table[i].Extra == "auto_increment")
            continue;
        console.log(table[i].Field)
        var { Field, ...obj } = table[i]
        data[table[i].Field] = obj
    }

    schemaDetails.tableName = data

    return {
        table: schemaDetails.tableName
    };
}

getData = async(internalQuery) => {

    console.log("Getting data")
    console.log(internalQuery)
    try {

        const [data] = await api.raw(internalQuery)

        // console.log(data);
        if (!data) {
            return null;
        }

        for (var i = 0; i < data.length; i++) {
            // if (data[i].Extra == "auto_increment")
            //     continue;
            // console.log(data[i].Field)
            var { Field, ...obj } = data[i]
            data[data[i].Field] = obj
        }

        console.log("found data");

        return {
            data: data
        };
    } catch (error) {
        throw error
    }
}

module.exports = {
    getDataBaseSchema,
    getTableDetails,
    getData,
}