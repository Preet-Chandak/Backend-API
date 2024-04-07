const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection URI
const DB_URI = 'mongodb+srv://preetchandak5:ge7etskOifY1yVED@cluster0.g7mdegy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// MongoDB database name
const DB_NAME = 'backend'; // Replace 'backend' with your actual database name

// Collection Name
const COLLECTION_NAME = 'preet'; // Replace 'preet' with your actual collection name

// Function to connect to MongoDB
async function connectToMongoDB() {
  try {
    const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(DB_NAME);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Function to insert a new user into the database
async function createUser(name, dob, location) {
  const db = await connectToMongoDB();
  const result = await db.collection(COLLECTION_NAME).insertOne({ name, dob, location });
  console.log('User inserted:', result.insertedId);
  return result.insertedId;
}

// Function to get a random user from the database
async function getRandomUser() {
  const db = await connectToMongoDB();
  const count = await db.collection(COLLECTION_NAME).countDocuments();
  if (count === 0) {
    return null; // No users found
  }
  const randomIndex = Math.floor(Math.random() * count);
  const user = await db.collection(COLLECTION_NAME).findOne({}, { skip: randomIndex });
  return user;
}

// Function to retrieve all users from the database
async function getAllUsers() {
  const db = await connectToMongoDB();
  const users = await db.collection(COLLECTION_NAME).find().toArray();
  return users;
}

// Function to retrieve names of all users from the database
async function getUserNames() {
  const db = await connectToMongoDB();
  const users = await db.collection(COLLECTION_NAME).find().toArray();
  const names = users.map(user => user.name);
  return names;
}

// Function to check if a user exists by name
async function checkUserExistence(name) {
  const db = await connectToMongoDB();
  const user = await db.collection(COLLECTION_NAME).findOne({ name });
  return user !== null;
}

// Function to retrieve users above a certain age
async function getUsersAboveAge(age) {
  try {
    const db = await connectToMongoDB();
    const currentDate = new Date();
    const users = await db.collection(COLLECTION_NAME).find().toArray();
    const filteredUsers = users.filter(user => {
      const dob = new Date(user.dob);
      const diff = currentDate.getFullYear() - dob.getFullYear();
      return diff > age;
    });
    return filteredUsers.map(user => user.name);
  } catch (error) {
    console.error('Error fetching users above age:', error);
    throw error;
  }
}
module.exports = {
  createUser,
  getRandomUser,
  getAllUsers,
  getUserNames,
  checkUserExistence,
  getUsersAboveAge
  // Add other database operations here
};
