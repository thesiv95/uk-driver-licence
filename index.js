const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const generate = require('./generate');
const app = express();
const PORT = process.env.PORT || 4000;
// app init config
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true})); // to handle symbols & ? in the POST query
app.listen(PORT, () => console.log(`Server was started on port ${PORT}`));

app.get('/', (req, res) => {
    res.render('index', { data: 'Your number will be here' });
});

app.post('/api/generate', (req, res) => {
    
    let data = req.body;

    let dataArrayToServer = [];
    // Fake fallback data is just to prevent errors, quick fix :)
    dataArrayToServer[0] = (data.lgFirstName !== '') ? data.lgFirstName : 'Bob';
    dataArrayToServer[1] = (data.lgMiddleName !== '') ? data.lgMiddleName : '';
    dataArrayToServer[2] = (data.lgLastName !== '') ? data.lgLastName : 'Green';
    dataArrayToServer[3] = (data.lgDate !== '') ? data.lgDate : '01-Jun-2000';
    dataArrayToServer[4] = (data.lgSex !== '') ? data.lgSex : 'M';    
    
    let g = generate(dataArrayToServer); // result that we need
    res.render('index', { data: g });
})