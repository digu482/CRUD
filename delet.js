exports.deleteMultipleUsers = async (req, res) => {
    try {
        const userIds = req.body.userIds; // Assuming you send an array of user IDs in the request body

        // Use a loop or Promise.all to soft delete multiple users based on their IDs
        const deletedUsers = await Promise.all(userIds.map(async (userId) => {
            const user = await User.findById(userId);

            if (!user) {
                // Handle the case where a user is not found
                return null;
            }

            user.isdelete = true;
            await user.save();

            return user;
        }));

        // Filter out null values (users not found) from the result
        const deletedUsersWithoutNull = deletedUsers.filter((user) => user !== null);

        return res.status(200).json({
            status: 200,
            message: 'Users soft deleted successfully',
            users: deletedUsersWithoutNull,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: 500,
            message: 'An error occurred during users soft deletion',
            error: error.message,
        });
    }
};
