import { createUser, getUserByEmail, getUserByName } from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req,res) => {
    try{
        const {name,email,password} = req.body;
        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return res.status(404).json({message: "Email is already exist"});
        }

        // hash password when user register
        const hashPassword = await bcrypt.hash(password,10)

        const user = await createUser({name,email,password:hashPassword,image:null})

        // create token
        const token = jwt.sign(
            {id:user.id,name:user.name,email:user.email,image:user.image,role:user.role},
            process.env.JWT_SECRET,
        )

        // set cookie
        res.cookie("token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // false in local dev
            sameSite: "none",
            maxAge: 24 * 60 * 60 *1000 // 1 day
        })

        return res.status(201).json({message:"User create successfully"});
    }catch(err){
        console.error(err);
        res.status(500).json({message: "Server error"});
    }
}

export const login = async (req,res) => {
    try{
        const {identifier,password} = req.body;

        // identifier is a eail or username

        // check user by email
        let user = await getUserByEmail(identifier);

        // check user by name if user type name
        if(!user) {
            user = await getUserByName(identifier)
        }
        if(!user) {
            return res.status(400).json({message: "Invalid username or passwprd"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({message: "invalid username/email or password"})
        }

        // create token
        const token = jwt.sign(
            {id:user.id,name:user.name,email:user.email,image:user.image,role:user.role},
            process.env.JWT_SECRET,
        )

        // set cookie
        res.cookie("token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // false in local dev
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })
        return res.status(200).json({message: "Login success"})
    } catch(e){
        console.error(e)
        res.status(500).json({message: "Server error"})
    }
}

export const getProfile = async (req,res) => {
    return res.status(200).json({
        message: "Profile fetched successfully",
        user: req.user
    })
}

export const logout = async (req,res) => {
    try{
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
        })
        return res.status(200).json({message:"Logout Succesfully"});
    }catch(e){
        console.error(e);
        return res.status(500).json({message:"Server error during logout"});
    }
}