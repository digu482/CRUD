const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import your User model

// Define the route to update users
router.post('/updateUsers', async (req, res) => {
  try {
    const { userUpdates } = req.body; // Assuming you send an array of user updates in the request body

    const results = [];

    for (const userUpdate of userUpdates) {
      const { userId, name, email } = userUpdate;
      const user = await User.findByIdAndUpdate(userId, { name, email }, { new: true });

      if (!user) {
        results.push({
          userId,
          status: 404,
          message: "User not found",
        });
      } else {
        results.push({
          userId,
          status: 200,
          message: "Update successful",
          user,
        });
      }
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
});

module.exports = router;
