import express from 'express';

import {auth} from './routes/auth';
import { error, log } from 'console';
import mongoose from 'mongoose';
import { user } from './routes/user';
import bodyParser from 'body-parser';
import { MONGODB_URI, PORT } from './config/variables';




const app = express();

app.use(bodyParser.json());
app.use('/auth', auth);
app.use('/user', user);

const start = async () => {
    try {
        if (MONGODB_URI) await mongoose.connect(MONGODB_URI);
        app.listen(PORT, () => {
            console.log('Server starts on port ' + PORT);
        })
    } catch (err) {
        error(err);
    }
}

start();