import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
export const register = async(req, res) => {

    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({
            message: "User created successfully",
        });

    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
}


export const login = async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        
        const passwordMatch = req.body.password.trim() === user.password;
        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid password",
            });
        }

        const token = jwt.sign({ userId: user._id, email: user.email , user: user.user }, 'secret', {
            expiresIn: '7d',
        });

        res.status(200).json({
            message: token,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}