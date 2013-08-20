var express = require('express');
var app = express();

var port = process.env.PORT || 8056;

require('./environment')(app, express);
require('./router')(app);

app.listen(port);
console.log('Express server listening on http://localhost:' + port);