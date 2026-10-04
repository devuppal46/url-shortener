const express = require('express');
const {handleRegisterUser} = require("../controllers/user")
const router = express.Router();

router.post('/register' , handleRegisterUser);

module.exports = router;