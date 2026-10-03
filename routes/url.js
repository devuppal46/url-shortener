const express = require('express');
const {handleGenerateShortId} = require("../controllers/url")
const router = express.Router();

router.post('/' , handleGenerateShortId);

module.exports = router;