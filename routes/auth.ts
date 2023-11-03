import express from 'express';
import {  IResponseUser, User } from '../models/user-model';
import { error } from 'console';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { TOKEN_KEY } from '../config/variables';


export const auth = express.Router();

//authenticate by email + pass
auth.post('/', async (req, res) => {
    const { email, password } = req.body
    if (email && password) {
        try {
            const user = await User.findOne({ email });
            if (TOKEN_KEY && user && await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ user_id: user._id, email }, TOKEN_KEY, { expiresIn: "2h" });
                user.token = token;
                //@ts-ignore
                const { password, ...responseUser } = user._doc;
                return res.status(200).send({ user: responseUser });
            }

            return res.status(400).send('Invalid credentials');
            
        } catch (err) {
            error(err);
        }
    }
})