//copy this code into a file named config.js and fill in with your own api


// Put your API key here!
var API_KEY = 'YOUR_API_KEY_HERE';

module.exports = {API_KEY};

<<<<<<< HEAD
=======
module.exports = {
  TOKEN: 'token_here',
  url: 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp',
  auth: { headers: { Authorization: '' } }
};

>>>>>>> e0b7bea0777d82b9ebbe343ae75c001b4de472e3
router.get('/products', overview.getProducts);
router.get('/products/:productId', overview.getProductById);
router.get('/products/:productId/styles', overview.getStyles);
router.get('/products/:productId/related', overview.getRelated);
