const { createUser, getRandomUser, getAllUsers, getUserNames, checkUserExistence, getUsersAboveAge } = require('../database/dbOperations');

// Create User Data
exports.createUser = async (req, res) => {
  try {
    const { name, dob, location } = req.body;
    await createUser(name, dob, location);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Get Random User
exports.getRandomUser = async (req, res) => {
  try {
    const user = await getRandomUser();
    if (!user) {
      return res.status(404).json({ error: 'No users found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching random user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get User Names
exports.getUserNames = async (req, res) => {
  try {
    const names = await getUserNames();
    res.json(names);
  } catch (error) {
    console.error('Error fetching user names:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Check User Existence
exports.checkUserExistenceHandler = async (req, res) => {
  try {
    const { name } = req.body;
    const exists = await checkUserExistence(name);
    res.json({ exists });
  } catch (error) {
    console.error('Error checking user existence:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Users Above Age
exports.getUsersAboveAge = async (req, res) => {
  try {
    const { age } = req.body;
    console.log(age);
    const users = await getUsersAboveAge(age);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users above age:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
