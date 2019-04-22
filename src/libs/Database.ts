import {insertSeedData} from '../libs/seedData';
import * as mongoose from 'mongoose';
export class Database {
    constructor() {
    }
    open = (mongoURL:string) => {
        mongoose.connect(mongoURL, {useNewUrlParser: true});
        let db = mongoose.connection;
        db.on('error', (err) => {
            console.log(`Error Connecting to Database  ${err}`)
        })
        db.once('open', () => {
            console.log('Mongo Running on PORT 27017');
            insertSeedData();
        })
    }
    disconnect = () => {
        mongoose.connection.close();
    }
}