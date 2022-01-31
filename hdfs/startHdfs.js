const WebHDFS = require("webhdfs");

var request = require("request");

const Params = require('../constants');

var hdfs = WebHDFS.createClient({
    user: process.env.HDFS_USER, // Hadoop user
    host: process.env.HDFS_HOST, // Namenode host
    port: process.env.HDFS_PORT, // Namenode port
    path: process.env.HDFS_URL
});

module.exports = hdfs;