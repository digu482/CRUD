exports.updateUsers = async (req, res) => {
  try {
    const { userUpdates } = req.body; // Assuming you send an array of user updates in the request body

    const updatePromises = userUpdates.map(async (userUpdate) => {
      const { userId, name, email } = userUpdate;
      const user = await User.findById(userId);

      if (!user) {
        return {
          userId,
          status: 404,
          message: "User not found",
        };
      } else {
        const updatedUser = {
          name,
          email,
        };

        await User.findByIdAndUpdate(userId, updatedUser, { useFindAndModify: false });
        
        return {
          userId,
          status: 200,
          message: "Update successful",
        };
      }
    });

    const results = await Promise.all(updatePromises);

    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};
