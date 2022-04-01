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

app.get('/api', (req, res) => {

  /* TO SEND A GET REQUEST FROM THIS METHOD:
  --this code goes in your component file--

    axios.get('/api', {headers: {path: '/products/65631/styles'}})

    make an an axios get request to the /api endpoint, pass in an object with
    a prop for headers, and pass an object as theat props value. Call a prop in that object
    'headers' and set it equal to the endpoint you are trying to acess. If any there are
    questions ask me or refer to the example line of code above!

  */

  console.log(`${url}${req.headers.path}`);

  axios.get(`${url}${req.headers.path}`, { headers: {Authorization: API_KEY}})
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