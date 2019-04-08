import * as dotnev from 'dotenv';
import {IConfig} from './IConfig';
dotnev.config();
 export let  config:IConfig={
     NODE_ENV:process.env.NODE_ENV,
     PORT:'9000'
 }
 Object.freeze(config);