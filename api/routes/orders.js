const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests to /orders'
  });
});

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling POST request to /orders'
  });
});

router.get('/:orderId', (req, res, next) => {
  const id = req.params.orderId;

  if (id === 'special') {
    res.status(200).json({
      message: 'You discovered the special ID',
      id: id
    });
  } else {
    res.status(200).json({
      message: 'You passed an ID',
    })
  }
});

router.patch('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Updated order!'
  });
});

router.delete('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Deleted order!'
  });
});

module.exports = router; 