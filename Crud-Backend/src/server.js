const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express()

console.log('Node is working')

app.set('port', process.env.PORT || 8000);

var corsOptions = {
    origin: ('port')
};

app.use(cors(corsOptions));

// Database
const db = require('../app/models')
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Database Connected Successfully")
    })
    .catch(err => {
        console.log("Cannot connect to Database", err)
        process.exit()
    })

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
require('../app/routes/user.routes')(app)

// Start Server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
})
