const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

async function connectToMongoDB() {
  try {
    const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(); // Assuming you want to connect to the default database
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

connectToMongoDB()
  .then((db) => {
    app.locals.db = db; // Store the database connection in app.locals for access in routes
    app.use(express.json());
    app.use('/api/users', userRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error starting the server:', error);
  });
