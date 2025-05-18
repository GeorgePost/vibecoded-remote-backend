const express = require('express');
const { RokuService } = require('../services/roku.service');

const router = express.Router();
const rokuService = new RokuService();

// Send a command to Roku device
router.post('/command', async (req, res, next) => {
  try {
    const { ip, command } = req.body;
    
    if (!ip || !command) {
      return res.status(400).json({
        success: false,
        error: 'IP and command are required'
      });
    }

    const result = await rokuService.sendCommand(ip, command);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Test connection to Roku device
router.get('/test', async (req, res, next) => {
  try {
    const { ip } = req.query;
    
    if (!ip) {
      return res.status(400).json({
        success: false,
        error: 'IP is required'
      });
    }

    const result = await rokuService.testConnection(ip);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = { rokuRouter: router }; 