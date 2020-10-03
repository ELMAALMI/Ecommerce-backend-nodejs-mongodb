const express = require('express');
const router  = express.Router();

const { createProduct,
        GetProductById,
        GetAllProduct,
        RelatedProduct,
        productById,
        DeleteProduct,
        UpdateProduct,
        SearchProduct,
        Productimage
      } = require('../Controllers/ProductController');

const {isAdmin,requireSigin,isAuth} = require('../Middlewares/auth');
const {userById} = require('../Middlewares/user');


router.post('/create/:userId',[requireSigin,isAuth,isAdmin],createProduct);

router.post('/search',SearchProduct);

router.get('/:productId',GetProductById);

router.get('/image/:productId',Productimage);

router.get('/related/:productId',RelatedProduct);

router.get('/',GetAllProduct);

router.delete('/:productId/:userId',[requireSigin,isAuth,isAdmin],DeleteProduct);

router.put('/:productId/:userId',[requireSigin,isAuth,isAdmin],UpdateProduct);




router.param('userId',userById);
router.param('productId',productById);

module.exports = router;
