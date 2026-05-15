const { nanoid } = require("nanoid");
const URL = require('../models/url');

async function handleGenerateShortId(req, res) {
    const body = req.body;
    const shortId = nanoid(8);

    if (!body.url) return res.status(400).json({ error: "url is required" });
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    });
    return res.json({ id: shortId });
}

async function handleRedirectShortId(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    })
    res.redirect(entry.redirectURL);
}

module.exports = {
    handleGenerateShortId,
    handleRedirectShortId
}