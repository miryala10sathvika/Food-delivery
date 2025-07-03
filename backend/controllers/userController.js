import userModel from "../models/userModel.js";    
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";



//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        //check if user exists
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.json({ success: false, message: "User does not exist" });
        }
        //check if password is correct
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        //create token
        const token = createToken(existingUser._id);
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error in loginUser:", error);
        return res.json({ success: false, message: "Internal server error" });
    }
}
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};
//register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try{

        //check if user exists and return false if exsists
        const existingUser = await userModel.findOne({ email });
        if(existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }
        //validate email and password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email format" });
        }

        if (!validator.isLength(password, { min: 8 })) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        });
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    }catch (error) {
        console.error("Error in registerUser:", error);
        res.json({ success: false, message: "Internal server error" });
    }
    
}

export { loginUser, registerUser };