const Router = require('express').Router;
const userConroller = require('../controllers/user-conroller');
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration', 
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 32}),
    userConroller.registration);
router.post('/login', userConroller.login);
router.post('/logout', userConroller.logout);
router.get('/activate/:link', userConroller.activate);
router.get('/refresh', userConroller.refresh);
router.get('/users', authMiddleware, userConroller.getUsers);

module.exports = router