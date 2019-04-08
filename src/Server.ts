import { IConfig } from './config/IConfig'
import * as express from 'express';
let app = express();

export class Server {

     config: IConfig
     bootstrap = ():Server => {
          this.setupRoutes();
          return this
     }
     setupRoutes = () => {
          app.get('/health-check', (req, res, next) => {
               res.send('I am OK');
          })
     }
     run = ():Server => {
          try{
               app.listen(this.config.PORT, () => {
                    console.log(`Server started at PORT ${this.config.PORT}`);
     
               })
          }
          catch (err){
               console.log(`Error in starting server at port ${this.config.PORT} ,ERRMSG: "${err}"`)
          }
          return this;
     }
     constructor(config: IConfig) {
          this.config = config;
     }
}