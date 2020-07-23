const axios = require('axios');

module.exports = async (req, res) => {
  const { username } = req.query;
  const {
    data
  } = await axios.get(`https://profile-summary-for-github.com/api/user/${username}`);
  res.json(data);
};