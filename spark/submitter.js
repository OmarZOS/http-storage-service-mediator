submitJob = () => {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;

        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            print(`Query submission ${data.submissionId} success: ${data.success}.`)
                // {
                //     "action" : "CreateSubmissionResponse",
                //      "message" : "Driver successfully submitted as driver-20200923223841-0001",
                //      "serverSparkVersion" : "2.4.0",
                //      "submissionId" : "driver-20200923223841-0001",
                //      "success" : true
                // }
                // we get the returned data
        }
        // end of state change: it can be after some time (async)
    };
    xhr.open("POST", yourUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify({
        value: value,
        data: {
            "appResource": "/home/hduser/sparkbatchapp.jar",
            "sparkProperties": {
                "spark.executor.memory": "8g",
                "spark.master": `spark://${process.env.SPARK_HOST}:${process.env.SPARK_PORT}`,
                "spark.driver.memory": "8g",
                "spark.driver.cores": "2",
                "spark.eventLog.enabled": "false",
                "spark.app.name": "Spark REST API - PI",
                "spark.submit.deployMode": "cluster",
                // "spark.jars": "/home/user/spark-examples_versionxx.jar",
                "spark.driver.supervise": "true"
            },
            "clientSparkVersion": "2.4.0",
            // "mainClass": "org.apache.spark.examples.SparkPi",
            "environmentVariables": {
                "SPARK_ENV_LOADED": "1"
            },
            "action": "CreateSubmissionRequest",
            "appArgs": [
                "80"
            ]
        }
    }));
}