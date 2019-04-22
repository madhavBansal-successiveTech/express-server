import {VersionableSchema} from './VersionableSchema';
import * as mongoose from 'mongoose'
export let VersionModel=mongoose.model('Version',VersionableSchema); 