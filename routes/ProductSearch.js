const express = require("express");
const https = require("https");
const router = express.Router();

router.get('/', (req,res) => {
    let query = req.query.q;

    const options = {
        "method": "GET",
        "hostname": "spotify23.p.rapidapi.com",
        "port": null,
        "path": "/search/?q=" + query + "&type=artists&offset=0&limit=15&numberOfTopResults=5",
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
            //const body = Buffer.concat(chunks);
            const spotifyData = JSON.parse(chunks);

            const q = spotifyData.query;
            const itemsAmount = spotifyData.artists.items.length;
            const informations = spotifyData.artists.items;

            console.log(q);
            console.log(itemsAmount);
            res.render("ProductSearch", {
                ProdAmounts: itemsAmount,
                infos: informations
            });
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    request.end();
})

module.exports = router;