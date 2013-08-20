var path = require('path');
var less = require('less-middleware');

module.exports = function(app, express) {
    app.configure(function() {
        app.use(express.favicon());
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.errorHandler());
        app.use(express.compress());
        app.set('views', path.join(__dirname, 'jade'));
        app.set('view engine', 'jade');
        app.use(express.cookieParser());
        app.use(express.session({
            secret: 'demo-01'
        }));
        app.use(app.router);
    });

    app.configure('development', function() {
        app.locals.pretty = true;
        app.use(less({
            dest: path.join(__dirname, '..', 'static', 'css'),
            src: path.join(__dirname, '..', 'assets', 'less'),
            prefix: '/static/css'
        }));

        app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));
        app.use('/static', express.static(path.join(__dirname, '..', 'static')));
    });

    app.configure('production', function() {
        app.use('/static', express.static(path.join(__dirname, '..', 'static')));
    });
}