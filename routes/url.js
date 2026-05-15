const express = require('express');
const {handleGenerateShortId} = require("../controllers/url")
const {handleRedirectShortId} = require("../controllers/url")
const {handleGetAnalytics} = require("../controllers/url")
const router = express.Router();

router.post('/' , handleGenerateShortId);
router.get('/:shortId' , handleRedirectShortId);
router.get('/:shortId/analytics' , handleGetAnalytics);

module.exports = router;