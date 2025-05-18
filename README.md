# Roku Remote Backend

Backend service for the Roku Remote Control application. This service handles communication with Roku devices and provides a REST API for the frontend.

## Features

- REST API for Roku device control
- Command queuing and rate limiting
- Error handling and logging
- Health check endpoint
- CORS support

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```bash
PORT=3001
NODE_ENV=development
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### POST /api/roku/command
Send a command to a Roku device.

Request body:
```json
{
  "ip": "192.168.1.100",
  "command": "VolumeUp"
}
```

### GET /api/roku/test
Test connection to a Roku device.

Query parameters:
- `ip`: Roku device IP address

## Deployment

This project is configured for deployment on Render.com. See `render.yaml` for configuration details.

## Development

- `npm run dev`: Start development server
- `npm start`: Start production server
- `npm test`: Run tests 