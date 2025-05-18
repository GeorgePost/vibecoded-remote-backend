const fetch = require('node-fetch');

class RokuService {
  constructor() {
    this.commandQueue = new Map(); // IP -> Queue
  }

  async sendCommand(ip, command) {
    try {
      const rokuUrl = `http://${ip}:8060/keypress/${command}`;
      
      const response = await fetch(rokuUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      return {
        success: response.ok,
        status: response.status,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Failed to send command: ${error.message}`);
    }
  }

  async testConnection(ip) {
    try {
      const response = await fetch(`http://${ip}:8060/query/device-info`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`Failed to connect to Roku device: ${response.status}`);
      }

      const text = await response.text();
      if (!text.includes('device-info')) {
        throw new Error('Invalid Roku response');
      }

      return {
        success: true,
        deviceInfo: {
          ip,
          lastTested: new Date().toISOString(),
          isTV: true
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = { RokuService }; 