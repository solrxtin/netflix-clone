import bcrypt from "bcryptjs";


import User from "../models/user.model.js"
import {generateTokenAndSetCookie} from "../utils/generateToken.js";



export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({success: false, message: "One or more fields missing"})
        }

        const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid credentials"});
		}

        const passwordCorrect = await bcrypt.compare(password, user.password);

        if (!passwordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid credentials"});
        }

        generateTokenAndSetCookie(user._id, res);
        return res.status(200).json({ success: true, user: {...user._doc, password: ""}});
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error"})
    }
}
export const logoutController = async (req, res) => {
    try {
        res.clearCookie("netflix-jwt");
        res.status(200).json({success: true, message: "Logged out successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error"})
    }
}
export const registerController = async (req, res) => {
    try {
		const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({success: false, message: "One or more fields missing"})
        }

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({success: false, message: "Invalid email format" });
		}

		const existingUsername = await User.findOne({ username });
		if (existingUsername) {
			return res.status(400).json({ success: false, message: "Username is already taken" });
		}

		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(400).json({success: false, message: "Email is already taken" });
		}

		if (password.length < 6) {
			return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = new User({
			username,
			email,
			password: hashedPassword,
		});

		generateTokenAndSetCookie(user._id, res);
        await user.save();

        res.status(201).json({
            success: true,
            user: {
                ...user._doc,
                password: "",
            }
        });
	} catch (error) {
		console.log("Error in register controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
// export const loginController = async (req, res) => {
//     try {
        
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({error: "Internal server error"})
//     }
// }