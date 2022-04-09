const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const axios = require('axios');
const {API_KEY} = require('./config/config.js');
const auth = { headers: { Authorization: API_KEY} };

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

  axios.get(`${url}${req.headers.path}`, auth)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => res.send(err));

});

app.post('/api', (req, res) => {
  console.log(`${url}${req.headers.path}`)
  console.log(req.body)

  axios.post(`${url}${req.headers.path}`, req.body, auth)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => res.send(err));
});

app.put('/api', (req, res) => {

  /* TO SEND A PUT REQUEST FROM THIS METHOD:
  --this code goes in your component file--

    axios.get('/api', null, {headers: {path: '/products/65631/styles'}})

    make an an axios get request to the /api endpoint, make the next argument null, and pass in an object with
    a prop for headers, and pass an object as theat props value. Call a prop in that object
    'headers' and set it equal to the endpoint you are trying to acess. If any there are
    questions ask me or refer to the example line of code above!

  */

  axios.put(`${url}${req.headers.path}`, null, auth)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => res.send(err));
});

//PUT REQUEST FOR RATINGS AND REVIEWS

app.put('/api/reviews/:review_id/helpful', (req, res) => {
  axios.put(`${url}/reviews/${req.params.review_id}/helpful`, null, auth)
    .then((response) => res.send(response.data))
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});