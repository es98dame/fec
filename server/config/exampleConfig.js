//copy this code into a file named config.js and fill in with your own api


// Put your API key here!
var API_KEY = 'YOUR_API_KEY_HERE';

module.exports = {API_KEY};

module.exports = {
  TOKEN: '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',
  url : 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp',
  auth : { headers: { Authorization: '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' } }
};

router.get('/products', overview.getProducts);
router.get('/products/:productId', overview.getProductById);
router.get('/products/:productId/styles', overview.getStyles);
router.get('/products/:productId/related', overview.getRelated);
