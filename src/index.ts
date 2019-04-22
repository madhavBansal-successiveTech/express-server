import {Server} from './Server';
import {config} from './config/configuration';
let startApp=new Server(config);
startApp.bootstrap().run();
