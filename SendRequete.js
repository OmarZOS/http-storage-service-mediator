var XMLHttpRequest = require('xhr2');
var xhr = new XMLHttpRequest();
//json = {'username':'Olivia','password':'123'}
var json = {
    "request_Type": "record",
    "destination": "sql",
    "operation": "select",
    "data": [{
        "table": ["BAC"],
        "attribut_Select": ["*"],
        "attribut": ["NOM_BAC"],
        "valeur": ["bac1"],
        "condition": ["="]
    }]

}
var data = JSON.stringify(json);


xhr.onreadystatechange = function(event) {
    if (xhr.readyState === 4) {
        const statusCode = xhr.status;
        const responseText = xhr.responseText;
        console.log(statusCode);
        console.log(JSON.parse(responseText));
    }
}

xhr.open('POST', `http://process.env.HOST:${process.env.PORT}/`, true);
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(data);