const express = require('express');
const {handleRedirectShortId} = require("../controllers/url")
const {handleGetAnalytics} = require("../controllers/url")
const router = express.Router();


router.get('/' , handleRedirectShortId);
router.get('/analytics' , handleGetAnalytics);

module.exports = router;