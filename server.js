const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', 'temp');

app.get('/', (req, res, next) => {
    res.render("ProductPage", {
    ProdNum: 3, // when 
    price: 1,
    currency:'USD'
    })
})

app.get('/RegistrationPage', (req, res) => {
    res.render('RegistrationPage.ejs')
})

app.get('/SignInPage', (req, res) => {
    res.render('SignInPage.ejs')
})

app.post('/YourMailAddress', (req, res) => {

    let email = req.body.answer;
    console.log(email);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shopcurio8@gmail.com',
            pass: '!Example123',
        },
    })

    let result = transporter.sendMail({
        from: '<shopcurio8@gmail.com>',
        to: email,
        subject: 'Message from Node js',
        text: 'This message was sent from Node js server.',
        html:
            'This <i>message</i> was sent from <strong>Node js</strong> server.',
    })
    console.log(result)
    res.sendFile(__dirname + '/SignInPage.ejs');
})


app.get('/productSearch', (req,res) => {
    let query = req.query.q;

    const options = {
        "method": "GET",
        "hostname": "spotify23.p.rapidapi.com",
        "port": null,
        "path": "/search/?q=" + query + "&type=artists&offset=0&limit=5&numberOfTopResults=5",
        "headers": {
            "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
            "X-RapidAPI-Key": "182770ccb7mshe1b3bb6d0e5e6efp186144jsn2777933e09c2",
            "useQueryString": true
        }
    };

    const request = https.request(options, function (response) {
        const chunks = [];

        response.on("data", function (chunk) {
            chunks.push(chunk);
        });

        response.on("end", function () {
            const body = Buffer.concat(chunks);
            const spotifyData = JSON.parse(chunks);

            const q = spotifyData.query;
            const itemsAmount = spotifyData.artists.items.length;
            console.log(q);
            console.log(itemsAmount);
            res.json(spotifyData);
            //console.log(body.toString());
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    request.end();
})

app.get("/adminPanel", (req, res, next) => {
    res.render("AdminPanel",{
        n: 3,
        page: ["Users", "Products", "Proposition"],
        classes: ["fa-users", "fa-cart-shopping", "fa-file"],
        link: ["adminPanel/users","adminPanel/products","adminPanel/propositions"]
    })
})

app.get("/adminPanel/users", (req, res, next) => {
    res.render("adminPanelOptions/users",{
        n: 3,
        page: ["Users", "Products", "Proposition"],
        classes: ["fa-users", "fa-cart-shopping", "fa-file"],
        link: ["users","products","propositions"],
        usersAmount: 3, // it's all like the example, how it will work
        userName: ["Konysbay Nurkuisa","Dosmukhamedov Aizat","Alexandrov Daniil"],
        email: ["nurkuisa@email.com", "aizat@email.com", "daniil@email.com"],
        password: ["qwertyujiksnbjhvabksjnvmkl26+af2b+asf", "jiksnbjhvabksjnvmkl26+af2b+asfasasgasd", "aisfbvaskv54151asv5a4sasvads1v5adsfb"]
    })
})

app.get("/adminPanel/products", (req, res, next) => {
    res.render("adminPanelOptions/products",{
        n: 3,
        page: ["Users", "Products", "Proposition"],
        classes: ["fa-users", "fa-cart-shopping", "fa-file"],
        link: ["users","products","propositions"],
        productsAmount: 3,  // it's all like the example, how it will work
        productName: ["Product 1","Product 2","Product 3"],
        productPrice: ["100", "200", "300"],
        ownerId: ["1", "2", "3"]
    })
})


// Proposition - a person leaves a request for his product to be added to the list on the site.
app.get("/adminPanel/propositions", (req, res, next) => {
    res.render("adminPanelOptions/propositions",{
        n: 3,
        page: ["Users", "Products", "Proposition"],
        classes: ["fa-users", "fa-cart-shopping", "fa-file"],
        link: ["users","products","propositions"],
        proposiotionsAmount: 1,  // it's all like the example, how it will work
        productName: ["Product 1"],
        description: ["This is the 150 years old vase."],
        ownerId: ["1"]
    })
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});