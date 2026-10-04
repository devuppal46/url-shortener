const express = require('express');
const {handleRegisterUser} = require("../controllers/user")
const {handleLoginUser} = require("../controllers/user")

const router = express.Router();

router.post('/register' , handleRegisterUser);
router.post('/login', handleLoginUser);

module.exports = router;