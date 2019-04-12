import * as express from 'express';
import TraineeController from './controller';
import {authMiddleWare} from '../../libs/routes/authMiddleWare';
export let app=express();
let controller=new TraineeController();
app.get('/',authMiddleWare('getUsers',['read']),controller.getMethodHandler);
app.post('/',authMiddleWare('getUsers',['write']),controller.postMethodHandler);
app.put('/',authMiddleWare('getUsers',['write']),controller.putMethodHandler);
app.delete('/:id',authMiddleWare('getUsers',['delete']),controller.deleteMethodHandler);
