import userModel from "../schema/user.model.js";
import bcrypt from "bcryptjs";


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("Registration Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};