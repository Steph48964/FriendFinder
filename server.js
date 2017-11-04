var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 8081;

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});

