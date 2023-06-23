// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Router=require('./routes/route.js')
const cors=require('cors')
// Create Express app
const app = express();

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Add the following headers in your server response
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
// app.use(cors())

// Connect to MongoDB
mongoose.connect('mongodb+srv://pneel578:pneel578@cluster0.3jnmkyi.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>console.log('db connected')).catch(err=>console.log(err));

app.use('/', Router);
// Define registration route

// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
