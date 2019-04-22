import {UserSchema} from './UserSchema';
import * as mongoose from 'mongoose'
export let UserModel=mongoose.model('User',UserSchema); 