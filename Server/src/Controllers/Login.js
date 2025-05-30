import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel from '../Models/User.model.js'


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password)))
            return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "Login successful", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, success: false });
    }
}

const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        // check email is already exist or not
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exist" })
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create new user
        const newUser = new UserModel({ name, email, password: hashedPassword });
        // save user
        await newUser.save();
        // send response
        res.status(201).json({ message: "Registration successful", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

// generated function for get all user in backend
const getuser = async (req, res) => {
    const id = req.body;
    try {
        const userID = req.params.id
        const user = await UserModel.findById(userID).select('-password');
        if (!user) {
            return res.status(401).json({ message: "User is not find..." });
        }
        res.status(201).json({ message: "User Find Successfully... ", User: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const checkauthuser = async (req, res) => {
    try {
        res.json({ isLogin: true, user: req.user })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}


// clear the cookies
const Logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            path: '/',
        });
        res.status(200).json({ message: "Logout successful", success: true });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: error.message, success: false });
    }
};


export { login, registration, getuser, checkauthuser, Logout };