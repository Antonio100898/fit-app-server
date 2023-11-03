import express from 'express';
import { User } from '../models/user-model';
import { error, log } from 'console';
import bcrypt from 'bcryptjs';
export const user = express.Router();
import { verifyToken } from '../middleware/auth';

const userSelectedParams = ['name', 'email', 'createdAt'];

//create new user (sign-up)
user.post('/sign-up', verifyToken, async (req, res) => {
    const { email, password, name } = req.body
    if (!(email && password && name)) return res.status(400).send('Required fields: email, password, name');

    try {
        const alreadyExists = await User.exists({ email });
        if (alreadyExists) return res.status(400).send('User with provided email already exists');
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email: email.toLowerCase(), password: encryptedPassword, name, createdAt: Date.now() });
        res.status(200).send('User has been successfully created');
    } catch (err) {
        log(err);
        return res.status(500).send(err);
    }
})
//get user by id
user.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ _id: id }).select(userSelectedParams);
        if (!user) return res.status(404).send('User nas not been found');
        return res.status(200).send(user);
    } catch (err) {
        error(err)
        return res.status(500).send(err);
    }
})
// delete user by id
user.delete('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        if (await User.exists({ _id: id })) {
            await User.deleteOne({ _id: id });
            return res.status(200).send('User has been successfully deleted');
        }
        return res.status(404).send(`Cannot delete user (user with provided id(${id}) nas not been found)`);
    } catch (err) {
        error(err);
        return res.status(500).send(err);
    }
})
//update user by id
user.put('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        if (await User.exists({ _id: id })) {
            await User.updateOne({ _id: id }, req.body);
            res.status(200).send('User has been successfully updated');
        }
    } catch (err) {
        log(err);
        return res.status(500).send(err);
    }
})
//get all users
user.get('/', async (req, res) => {
    try {
        const users = (await User.find().select(userSelectedParams));
        if (!users) return res.status(404).send('Users nas not been found');
        return res.status(200).send(users);
    } catch (err) {
        error(err)
        return res.status(500).send(err);
    }
})
//get list of users by filter
user.get('/:name', async (req, res) => {
    const {name} = req.params;
    log(`name: ${name}`);
    
    try {
        
    } catch (err) {
        error(err)
        return res.status(500).send(err);
    }
})