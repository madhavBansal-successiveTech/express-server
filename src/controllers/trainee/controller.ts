import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt'
import { UserRepository } from '../../repositories/user/UserRepository'
import { UserData } from '../../repositories/user/IUserModel';
export default class TraineeController {
    constructor() { }
    getMethodHandler = (req, res, next): void => {
        console.log('gethandler has beeen called', req.query);
        if (req.query.skip && req.query.skip !== '') {
            let isNum: boolean = /^\d+$/.test(req.query.skip) && typeof req.query.skip !== 'object'
            if (!isNum)
                throw { error: 'Error Occured', message: '"skip" should be of type "Number"', status: 405 }
            else req.query.skip = parseInt(req.query.skip)

        }
        else req.query.skip = 0
        if (req.query.limit && req.query.limit != '') {
            let isNum: boolean = /^\d+$/.test(req.query.limit) && typeof req.query.limit !== 'object'
            if (!isNum)
                throw { error: 'Error Occured', message: '"limit" should be of type "Number"', status: 405 }
            else req.query.limit = parseInt(req.query.limit)
        }
        else req.query.limit = 10
        new UserRepository().get({}, false, req.query.limit, req.query.skip).then((result) => {
            res.send(`Data fetched successfully \n ${JSON.stringify(result)}`)
        }, (err) => {
            next({ error: err.error, message: err.message, status: err.status })
        })
    }
    postMethodHandler = (req, res, next): void => {
        console.log('posthandler has beeen called', req.body);
        if (!req.body)
            throw { error: 'Error Occured', message: '"body" is not present' }
        if (!req.body.id || req.body.id === '')
            throw { error: 'Error Occured', message: '"id" is mandatory', status: 405 }
        else if (typeof req.body.id !== 'string')
            throw { error: 'Error Occured', message: '"id" should be of type String', status: 405 }
        if (!req.body.name || req.body.name === '')
            throw { error: 'Error Occured', message: '"name" is mandatory', status: 405 }
        if (!req.body.email || req.body.email === '')
            throw { error: 'Error Occured', message: '"email" is mandatory', status: 405 }
        if (!req.body.password || req.body.password === '')
            throw { error: 'Error Occured', message: '"password" is mandatory', status: 405 }
        else this.customValidator(req, 'create')
        bcrypt.hash(req.body.password, 10).then((hash:string) => {
            req.body.password = hash;
            new UserRepository().create(req.body).then((success) => {
                res.send(`Information has been saved Successfully \n ${JSON.stringify(success)}`)
            }, (err) => {
                next({ error: err.err, message: err.message, status: 405 })
            })

        }, (err) => {
            next({ error: err.name, message: err.message, status: 405 })
        })
    }
    putMethodHandler = (req, res, next): void => {
        console.log('puthandler has beeen called', req.body);
        if (!req.body)
            throw { error: 'Error Occured', message: '"body" is not present', status: 405 }
        if (!req.body.id || req.body.id === '')
            throw { error: 'Error Occured', message: '"id" is mandatory', status: 405 }
        else if (typeof req.body.id !== 'string')
            throw { error: 'Error Occured', message: '"id" should be of type String', status: 405 }
        if (!req.body.dataToUpdate)
            throw { error: 'Error Occured', message: '"dataToUpdate" is mandatory', status: 405 }
        else this.customValidator(req, 'update')
        if (req.body.dataToUpdate.password && req.body.dataToUpdate.password!='') {
            bcrypt.hash(req.body.dataToUpdate.password, 10).then((hash:string) => {
             req.body.dataToUpdate.password=hash;
             new UserRepository().update(req.body).then((success) => {
                if (success)
                    res.send(`Information has been Updated Successfully \n ${JSON.stringify(success)}`)
                else
                    res.send(`Given Id doesn't exist`)
            }, (err) => {
                next({ error: err.err, message: err.message, status: 405 });
            })
            }, (err) => {
                next({ error: err.name, message: err.message, status: 405 })
            })
        }
        else{
            new UserRepository().update(req.body).then((success) => {
                if (success)
                    res.send(`Information has been Updated Successfully \n ${JSON.stringify(success)}`)
                else
                    res.send(`Given Id doesn't exist`)
            }, (err) => {
                next({ error: err.err, message: err.message, status: 405 });
            })
        }
       
    }
    deleteMethodHandler = (req, res, next): void => {
        console.log('deletehandler has beeen called', req.params);
        if (!req.params.id || req.params.id === '')
            throw { error: 'Error Occured', message: '"id" is required', status: 405 }
        else this.customValidator(req, 'delete')

        new UserRepository().delete(req.params.id).then((id:number|null|undefined) => {
            if (id)
                res.send(`Information has been deleted Successfully of id: ${id}`)
            else
                res.send(`Given id "${req.params.id}" doesn't exist in database`)

        }, (err) => {
            next({ error: err.err, message: err.message, status: 405 })
        })
    }
    private customValidator = (req, handlerType: string): void => {
        console.log('customValidator has beeen called');
        if (handlerType === 'create') {
            if (typeof req.body.name !== 'string')
                throw { error: 'Error Occured', message: '"name" should be of type String', status: 405 }
        }
        else if (handlerType === 'update') {
            if (typeof req.body.dataToUpdate != 'object' || Array.isArray(req.body.dataToUpdate))
                throw { error: 'Error Occured', message: '"dataToUpdate" should be an Object(not even an Array)', status: 405 }
            else if (!Object.keys(req.body.dataToUpdate).length)
                throw { error: 'Error Occured', message: '"dataToUpdate" Cannot be a blank Object', status: 405 }
        }
        else if (handlerType === 'delete') {
            if (typeof req.params.id !== 'string')
                throw { error: 'Error Occured', message: '"id" should be of type String', status: 405 }
        }
        else if (handlerType === 'get') {
            //no code added yet
        }
    }
}