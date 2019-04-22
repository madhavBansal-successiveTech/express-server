import { IConfig } from './config/IConfig'
import * as express from 'express';
import * as bodyParser from 'body-parser';
import {app as notFoundRoute}  from './libs/routes/notFoundRoute'
 import {errorHandler} from './libs/routes/errorHandler'
import {app as traineeRoutes} from './controllers/trainee/routes';
import {Database} from './libs/Database';
let app = express();
export class Server {

     config: IConfig
     bootstrap = (): Server => {
          this.initBodyParser();
          this.setupRoutes();
          
          return this
     }
     setupRoutes = () => {
          app.get('/health-check', (req, res, next) => {
               res.send('I am OK');
          })
        
          
          app.use('/api',traineeRoutes);
          app.use(notFoundRoute);
          app.use(errorHandler);
          
     }
     run = (): Server => {
          try {
               app.listen(this.config.PORT, () => {
                    console.log(`Server started at PORT ${this.config.PORT}`);
                    new Database().open(this.config.MONGO_URL);

               })
          }
          catch (err) {
               console.log(`Error in starting server at port ${this.config.PORT} ,ERRMSG: "${err}"`)
          }
          return this;
     }
     initBodyParser = () => {
          app.use(bodyParser.urlencoded({
               extended: true
          }))
          app.use(bodyParser.json())
     }
     constructor(config: IConfig) {
          this.config = config;
     }
}