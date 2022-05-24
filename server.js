const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");


// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('swagger-jsdoc');

const app = express();
//const port = 3000;
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.set('view engine', 'ejs');
app.set('views', 'temp');


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Products API",
            version: "1.0.0",
            description: "A simple Express Product API"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ],
    },
    apis: ["./routes/*.js"]
}


app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// swagger
const specs = swaggerDocument(options)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// routes
app.use("/aboutUs", require("./routes/aboutUs"));
app.use("/registrationPage", require("./routes/RegistrationPage")); // if localhost:3000/RegistrationPage
app.use("/signInPage", require("./routes/SignInPage")); // if localhost:3000/SignInPage
app.use("/yourMailAddress", require("./routes/YourMailAddress"));
app.use("/productSearch", require("./routes/ProductSearch")); // if local
app.use("/adminPanel", require("./routes/AdminPanel"));
app.use("/productsSwagger", require("./routes/ProductsSwagger"));
app.use("/", require("./routes/Main"));


let port = process.env.PORT;
if (port == null || port === "") {
    port = 3000;
}

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});








