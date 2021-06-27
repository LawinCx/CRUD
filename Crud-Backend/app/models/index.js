const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.user = 'Darwin'
db.password = 'Cwd0HjXWJOGYf9ZA'
db.url = `mongodb+srv://${db.user}:${db.password}@cluster0.kp8gr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
db.users = require("./user.model.js")(mongoose);

module.exports = db;