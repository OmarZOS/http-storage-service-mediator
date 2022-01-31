module.exports = {
    apps: [{
        name: 'sonatrach-storage-service',
        script: './app.js',

        node_args: ['--inspect=0.0.0.0:9229'],
        watch: true,
        // ignore_watch: ['public/**/*', 'views/**/*.ejs'],
    }, ],
};