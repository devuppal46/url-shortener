const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const User = require("../models/user");
const Session = require("../models/session");

async function handleRegisterUser(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                error: "name, email and password are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                error: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "User registered successfully",
            userId: user._id,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

async function handleLoginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "email and password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        const sessionId = nanoid(32);

        await Session.create({
            sessionId,
            userId: user._id,
            expiresAt: new Date(Date.now() + 7*24 * 60 * 60 * 1000), 
        })

        res.cookie("sessionId", sessionId, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Login successful",
            userId: user._id,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal server error"
        });     
    }
}

module.exports = {
    handleRegisterUser,
    handleLoginUser,
};