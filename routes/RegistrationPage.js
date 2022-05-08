const express = require("express");
const UserController  = require("../controllers/UserController");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('RegistrationPage.ejs');
})

router.post('/', (req, res) => {
    UserController.create(req,res);
})

module.exports = router;