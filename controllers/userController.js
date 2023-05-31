const { User, Thoughts } = require('../models');

module.exports = {
  // Get all users
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single user by _id and populate thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .then((user) => {
      !user
          ? res.status(404).json({ message: 'No user found with this id.' })
          : res.json(user);
  })
  .catch((err) => res.status(500).json(err));
},

  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Update a user by _id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove a user by _id
  removeUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }

        // Remove the associated thoughts of the user
        return Thoughts.deleteMany({ username: user.username });
      })
      .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  // Add a friend to a user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Remove a friend from a user's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
};
