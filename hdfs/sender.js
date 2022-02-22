var json = {
    filePath: "/",
    modelType: "2", //model Id : CNN by default
    scriptId: "1", //the script of the model
    jobId: "2", // provided by the 
    submissionReceiver: "Spark", //API's url: Spark
}

let fullUrl = `${process.env.HDFS_URL} + ${process.env.HDFS_HOST} + ':' + ${process.env.HDFS_PORT} + ${json.filePath}`;

var WebHDFS = require('webhdfs');

var hdfs = WebHDFS.createClient();

var localFileStream = fs.createReadStream('/path/to/local/file');

var remoteFileStream = hdfs.createWriteStream();

localFileStream.pipe(remoteFileStream);

remoteFileStream.on('error', function onError(err) {
    // Do something with the error
});

remoteFileStream.on('finish', function onFinish() {
    // Upload is done
});