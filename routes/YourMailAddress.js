const express = require("express");
const https = require("https");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post('/', (req, res) => {

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

module.exports = router;