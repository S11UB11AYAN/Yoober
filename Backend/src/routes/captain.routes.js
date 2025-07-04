const captainController = require('../controllers/captain.controllers');
const authMiddleware = require('../middlewares/auth.middlewares');
const express = require('express');
const router = express();
const { body } = require("express-validator");

router.post('/register', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('fullname.firstname').isLength({ min: 3 }).withMessage('Firstname must be at least 3 characcters long'),
  body('fullname.lastname').isLength({ min: 3 }).withMessage('Lastname must be at least 3 characcters long'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
  body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
  body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
],
  captainController.registerCaptain
)

router.post('/login', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
  captainController.loginCaptain
)

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile)

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)

module.exports = router;
