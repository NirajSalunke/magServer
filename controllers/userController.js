import User from "../models/userModel.js";

export const singup = async (req, res) => {
  const { name, email, id } = req.body;
  try {
    const user = await User.create({ name, email, clerkid: id });
    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const getRole = async (req, res) => {
  try {
    const clerkid = req.query.clerkid;
    if (!clerkid) {
      return res.status(400).json({
        success: false,
        message: "Email required",
      });
    }
    const response = await User.findOne({ clerkid });
    if (response) {
      return res.status(200).json({
        success: true,
        role: response.role,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No data found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
