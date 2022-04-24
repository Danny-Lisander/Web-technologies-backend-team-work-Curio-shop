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
/*
const options = {
    "method": "GET",
    "hostname": "50k-radio-stations.p.rapidapi.com",
    "port": "3000",
    "path": "/get/genres?keyword=music",
    "headers": {
        "X-RapidAPI-Host": "50k-radio-stations.p.rapidapi.com",
        "X-RapidAPI-Key": "182770ccb7mshe1b3bb6d0e5e6efp186144jsn2777933e09c2",
        "useQueryString": true
    }
};

app.post('/', (req,res) => {
    const request = https.request(options, function (res) {
        const chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            const body = Buffer.concat(chunks);
            console.log(body.toString());
        });
    });

    req.end();
})
*/


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/MainPage.html')
})

app.get('/MainPage', (req, res) => {
    res.sendFile(__dirname + '/MainPage.html')
})
app.get('/ProductPage', (req, res, next) => {
    res.render("ProductPage", {
    ProdNum: 3, // when 
    price: 1,
    currency:'USD'
    })
})
app.get('/RegistrationPage', (req, res) => {
    res.sendFile(__dirname + '/RegistrationPage.html')
})
app.get('/SignInPage', (req, res) => {
    res.sendFile(__dirname + '/SignInPage.html')
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
    res.sendFile(__dirname + '/SignInPage.html');
})



app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});