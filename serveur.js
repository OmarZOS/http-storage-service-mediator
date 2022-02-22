#!/usr/bin/env node

// const { importDailyDataFromFile } = require('./clumsy_functions')
const http = require('http')
const handler = require('./handler')

const requestListener = function(req, res) {

    res.setHeader('Content-Type', 'application/json');

    res.writeHead(200);

    let data = '';
    req.on('data', chunk => {
        data += chunk;
    })

    req.on('end', async() => {

            var json = JSON.parse(JSON.stringify(data))
            console.log("trying")
            console.log(json)
            var result = await handler.requestResolver(JSON.parse(json))

            try {
                var json = {
                    content: result,
                }
                res.write(JSON.stringify(json))
                console.log(json)
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