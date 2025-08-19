const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// YouTube endpoints
router.get('/youtube/channel', apiController.getChannelStats);
router.get('/youtube/videos', apiController.getLatestVideos);

// Merch endpoints
router.get('/merch', apiController.getMerchItems);
router.get('/merch/:id', apiController.getMerchItem);
router.post('/merch/checkout', apiController.createCheckoutSession);

// Cart endpoints
router.post('/cart', apiController.addToCart);
router.get('/cart/:userId', apiController.getCart);
router.put('/cart/:userId', apiController.updateCart);
router.delete('/cart/:userId/:itemId', apiController.removeFromCart);

// Analytics endpoints
router.get('/analytics/sales', apiController.getSalesData);
router.get('/analytics/traffic', apiController.getTrafficData);

module.exports = router;