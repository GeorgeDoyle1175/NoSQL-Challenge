const { User, Thought } = require('../models');

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
      .populate('thoughts')
      .populate('friends')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
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
          return Thought.deleteMany({ username: user.username });
        })
        .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
  };
