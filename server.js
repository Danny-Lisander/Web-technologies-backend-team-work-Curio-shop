const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
const port = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));

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
app.get('/ProductPage', (req, res) => {
    res.sendFile(__dirname + '/ProductPage.html')
})
app.get('/RegistrationPage', (req, res) => {
    res.sendFile(__dirname + '/RegistrationPage.html')
})
app.get('/SignInPage', (req, res) => {
    res.sendFile(__dirname + '/SignInPage.html')
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});