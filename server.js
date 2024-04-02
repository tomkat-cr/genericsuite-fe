const express = require('express')
const app = express()
const path = require('path')
const port = process.env.FRONTEND_LOCAL_PORT || 3000

app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log("Listening on Port", port)) 
