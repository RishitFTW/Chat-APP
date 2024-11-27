import generateToken from "../jwt/generateToken.js";
import User from "../Models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password do not match" });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    if (newUser) {
      generateToken(newUser._id, res);
      return res
        .status(201)
        .json({ message: "User registered successfully", newUser });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const check = await bcrypt.compare(password, user.password);

    if (!user || !check) {
      return res
        .status(400)
        .json({ message: "User not found or password is wrong" });
    }
    generateToken(user._id, res);

    return res.status(201).json({
      message: "User successfully logged in",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const logout=async(req,res)=>{
    try {
        res.clearCookie("jwt");
        return res.status(201).json({message: "User successfully logged out"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });        
    }
}
