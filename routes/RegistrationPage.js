const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('RegistrationPage.ejs')
})

module.exports = router;