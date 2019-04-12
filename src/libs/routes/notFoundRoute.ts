import * as express from 'express';
export let app=express();
app.use((req,res,next)=>{
    res.send('Page Not Found')
    })