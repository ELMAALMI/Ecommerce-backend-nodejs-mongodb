const express = require('express');
const router  = express.Router();

const { createCategory,
        getAllCategory,
        GetCategory,
        UpdateCategory,
        DeleteCategory,
        CategoryById
      } = require('../Controllers/CategoryController');
const {isAdmin,requireSigin,isAuth} = require('../Middlewares/auth');
const {userById} = require('../Middlewares/user');


router.post('/create/:userId',[requireSigin,isAuth,isAdmin],createCategory);

router.get('/',getAllCategory);

router.get('/:categoryId',GetCategory);

router.put('/:categoryId/:userId',[requireSigin,isAuth,isAdmin],UpdateCategory);

router.delete('/:categoryId/:userId',[requireSigin,isAuth,isAdmin],DeleteCategory);

router.param('categoryId',CategoryById);

router.param('userId',userById);



module.exports = router;

