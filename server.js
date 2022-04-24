const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'temp');


app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));

// routes
app.use("/registrationPage", require("./routes/RegistrationPage")); // if localhost:3000/RegistrationPage
app.use("/signInPage", require("./routes/SignInPage")); // if localhost:3000/SignInPage
app.use("/productSearch", require("./routes/ProductSearch")); // if local
app.use("/adminPanel", require("./routes/AdminPanel"));
app.use("/yourMailAddress", require("./routes/YourMailAddress"));

app.get('/', (req, res, next) => {
    res.render("ProductPage", {
    ProdNum: 3, // when we'll add DB, we'll can change this
    price: [5, 3, 7], // the same, like ProdNum
    currency:'USD'
    })
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});