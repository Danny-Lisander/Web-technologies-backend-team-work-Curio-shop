const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

const app = express();
//const port = 3000;
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.set('view engine', 'ejs');
app.set('views', 'temp');


app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));

// routes
app.use("/registrationPage", require("./routes/RegistrationPage")); // if localhost:3000/RegistrationPage
app.use("/signInPage", require("./routes/SignInPage")); // if localhost:3000/SignInPage
app.use("/yourMailAddress", require("./routes/YourMailAddress"));
app.use("/productSearch", require("./routes/ProductSearch")); // if local
app.use("/adminPanel", require("./routes/AdminPanel"));
app.use("/", require("./routes/Main")); //

let port = process.env.PORT;
if (port == null || port === "") {
    port = 3000;
}

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});








