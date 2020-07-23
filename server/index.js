const express = require('express');
const next = require("next");
const axios = require('axios');

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev
});
const port = process.env.PORT || 3000;
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  server.get("/_next/*", (req, res) => {
    handle(req, res);
  });
  server.get("/static/*", (req, res) => {
    handle(req, res);
  });
  server.get('/api/profile-summary/:username', async(req, res) => {
    const username = req.params.username;
    const {
      data
    } = await axios.get(`https://profile-summary-for-github.com/api/user/${username}`);
    res.json(data);
  });
  server.get("*", (req, res) => {
    handle(req, res);
  });
  server.listen(port, err => {
    if (err) throw err;
    console.log(`listening on port ${port}`);
  });
});