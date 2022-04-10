const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname))

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

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});