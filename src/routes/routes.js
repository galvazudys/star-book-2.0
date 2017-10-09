const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.locals.controller.renderThumbnail();
});

module.exports = router;
