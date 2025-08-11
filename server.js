const express = require('express')
const app = express()
const path = require('path')
const port = process.env.FRONTEND_LOCAL_PORT || 3000

// Basic rate limiting to mitigate DoS via expensive FS operations
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 120,            // limit each IP to 120 requests per window
  standardHeaders: true,
  legacyHeaders: false,
})

app.use(limiter)

app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log("Listening on Port", port)) 
