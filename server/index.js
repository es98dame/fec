const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const axios = require('axios');
const {API_KEY} = require('./config/config.js');
const auth = { headers: { Authorization: API_KEY} };

//create "Authorization" header
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp';

app.use(express.json());
app.use(express.static(path.join(__dirname, '../fec-client/dist')));
// /products/65632/styles
app.get('/api/:field', (req, res) => {
  //Send to this something of the form
  // '/api/YOURFIELD?your-query=your-value'

  axios.get(`${url}/${req.params.field}`, { params: req.query, headers: {Authorization: API_KEY}})
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => res.send(err));

});

app.get('/api/qa/questions/', (req, res) => {
  // let params = {
  //   product_id:
  // };
  //initial render^^^
  res.send('poop');
});



//make an axios call to the api (for product info.)
//https://app-hrsei-api.herokuapp.com/api/fec2/rfp/:reviews?product_id=num



app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});