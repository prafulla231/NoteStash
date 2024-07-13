const mongoose = require('mongoose');
const connectToMongo = require('./db');
var cors = require('cors')
const express = require('express')

const app = express() 
app.use(cors())
const port = 5000
mongoose.set('strictQuery', true);
connectToMongo();
app.use(express.json())  //If we want to use req.body we need this middleware
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
//Availabe routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.listen(port, () => {
  console.log(`Notestash listening on port ${port}`)
})

