const router = require('express').Router();

router.get('/', (req, res) => {
  try {
    res.sendFile('../public/index.html');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/stats', (req, res) => {
  try {
    res.sendFile('../public/stats.html');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/exercise', (req, res) => {
  try {
    res.sendFile('../public/exercise.html');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
