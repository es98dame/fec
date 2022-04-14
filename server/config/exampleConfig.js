//copy this code into a file named config.js and fill in with your own api


// Put your API key here!
var API_KEY = 'YOUR_API_KEY_HERE';

module.exports = {API_KEY};

router.get('/products', overview.getProducts);
router.get('/products/:productId', overview.getProductById);
router.get('/products/:productId/styles', overview.getStyles);
router.get('/products/:productId/related', overview.getRelated);
