import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import {config} from '../config/configuration'
export let app = express();
app.use((req, res, next) => {
    if (!req.query.password || req.query.password === '' || !req.query.email || req.query.email === '' || req.query.role === '' || !req.query.role)
        res.send("email,password,role is mandatory to generate a token");
    else if (typeof req.query.password != 'string' || typeof req.query.email != 'string')
        res.send("id/email should be of string type")
    else if (req.query.role != 'trainee' && req.query.role != 'head-trainer')
        res.send("role should be trainee/head-trainer")
    else {
        let privateKey:string = config.SECRETKEY
        let payload = {
            email: req.query.email,
            role: req.query.role,
            password:req.query.password
        }
        let token:string = jwt.sign(payload, privateKey,{expiresIn:"15m"});
        console.log('token  ', token)
        res.send(`Token successfully generated \n ${token}`);
    }


})
