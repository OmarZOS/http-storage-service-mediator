#!/usr/bin/env node

const { importDailyDataFromFile } = require('./clumsy_functions')
const http = require('http')
const handler = require('./handler')


var result;

const requestListener = function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    res.writeHead(200);

    let data = '';
    req.on('data', chunk => {
        data += chunk;
    })

    req.on('end', async() => {
            var json = JSON.parse(JSON.stringify(data))


            console.log(JSON.parse(json))

            console.log("destination : " + JSON.parse(json).destination)

            var result = await handler.requestResolver(JSON.parse(json))

            console.log(result.data)
            try {
                var json = {
                    "content": result.data
                }

                console.log(json)

                res.write(JSON.stringify(json))

                res.end();

            } catch (error) {
                var json = {
                    content: error,
                }
                res.write(JSON.stringify(json))

                res.end();
            }


        })
        // console.log(result);
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT);
module.exports = {
    server

}