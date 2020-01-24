const express = require("express");
const serverless = require("serverless-http");
const request = require("request");

const app = express();
const router = express.Router();

router.post("/analyze_url", (req, res) => {
  const options = {
    url: "https://api.textrazor.com",
    headers: {"x-textrazor-key": req.headers["api-key"]}
  };

  request.post(options).form({
    extractors: "topics",
    classifiers: "textrazor_iab_content_taxonomy",
    url: req.headers["url"]
  }).pipe(res);
});

app.use(express.json());
app.use("/.netlify/functions/service", router);

module.exports.handler = serverless(app);
