// const express = require('express');
// const { MongoClient } = require('mongodb');
// const dotenv = require('dotenv');
// const userRoutes = require('./routes/userRoutes');
// require('dotenv').config();

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;
// const DB_URI = process.env.DB_URI; // Use dotenv for DB_URI

// async function connectToMongoDB() {
//   try {
//     const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//     await client.connect();
//     console.log('Connected to MongoDB');
//     return client.db(); // Assuming you want to connect to the default database
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     throw error;
//   }
// }

// connectToMongoDB()
//   .then((db) => {
//     app.locals.db = db; // Store the database connection in app.locals for access in routes
//     app.use(express.json());
//     app.use('/api/users', userRoutes);

//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Error starting the server:', error);
//   });
const { MongoClient } = require('mongodb');

async function connectToMongoDB() {
  try {
    const DB_URI = process.env.DB_URI; // Use dotenv for DB_URI
    const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(); // Assuming you want to connect to the default database
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const db = await connectToMongoDB();
      // Your POST request handling logic here
      res.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
      console.error('Error handling POST request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
