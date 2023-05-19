const connection = require('../config/connection');
const { Thoughts, User } = require('../models');

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', async () => {
  console.log('connected');

  try {
    // Delete existing thoughts and users
    await Thoughts.deleteMany({});
    await User.deleteMany({});

    // Create an array of user objects
    const users = [
      {
        username: 'user1',
        email: 'user1@example.com',
        thoughts: [],
        friends: [],
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        thoughts: [],
        friends: [],
      },
      // Add more users here as needed
    ];

    // Insert the users into the database and retrieve their IDs
    const userDocs = await User.insertMany(users);
    const userIds = userDocs.map((user) => user._id);

    // Create an array of thought objects
    const thoughts = [
      {
        thoughtText: 'This is my first thought',
        username: userDocs[0].username,
      },
      {
        thoughtText: 'This is my second thought',
        username: userDocs[1].username,
      },
      // Add more thoughts here as needed
    ];

    // Insert the thoughts into the database and update the corresponding users
    const thoughtDocs = await Thoughts.insertMany(thoughts);
    thoughtDocs.forEach((thought) => {
      const { _id, username } = thought;
      const user = userDocs.find((user) => user.username === username);
      user.thoughts.push(_id);
      user.save();
    });

    console.log('Seed data inserted successfully!');
  } catch (error) {
    console.error(error);
  }

  // Close the database connection
  connection.close();
});
