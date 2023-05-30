const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  removeUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// Define user routes
router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(removeUser);

router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;

