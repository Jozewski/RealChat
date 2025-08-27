import userModel from "../users/userModel.js";
import loggedInUsersModel from "../loggedInUsers/usersModel.js";
import { io } from "../socket.js";

const authLogout = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Not authenticated." });
  }
  try {
    const removeToken = await userModel.updateOne(
      { _id: req.user._id },
      { token: [] }
    );
    const removeFromLoggedInUsers = await loggedInUsersModel.deleteMany({
      username: req.user.username,
    });

    // Socket broadcast new logged in user and return all logged in users
    const getLoggedinUsers = await loggedInUsersModel.find({});
    // TODO?: refactor array into map?
    io.emit("getOnlineUsers", getLoggedinUsers);

     // Passport/Express logout
    req.logout((err) => {
      if (err) {
        return res.status(400);
      }
      res.status(200).json({ success: true, message: "Logged out." });
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging out." });
  }
};

export default authLogout;
