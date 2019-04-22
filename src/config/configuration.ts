import * as dotnev from 'dotenv';
import {IConfig} from './IConfig';
dotnev.config();
 export let  config:IConfig={
     NODE_ENV:process.env.NODE_ENV,
     PORT:process.env.PORT,
     MONGO_URL:process.env.MONGO_URL,
     PASSWORD:process.env.PASSWORD,
     SECRETKEY:process.env.SECRETKEY
 }
 Object.freeze(config);