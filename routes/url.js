const express = require('express');
const {handleGenerateShortId} = require("../controllers/url")
const {handleRedirectShortId} = require("../controllers/url")
const router = express.Router();

router.post('/' , handleGenerateShortId);
router.get('/:shortId' , handleRedirectShortId);

module.exports = router;