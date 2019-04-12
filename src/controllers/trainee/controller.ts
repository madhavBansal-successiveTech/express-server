export default class TraineeController {
    constructor() { }
    getMethodHandler = (req, res, next): void => {
        console.log('gethandler has beeen called', req.query);
        if (req.query.skip && req.query.skip !== '') {
            let isNum:boolean = /^\d+$/.test(req.query.skip) && typeof req.query.skip !== 'object'
            if (!isNum)
                throw { error: 'Error Occured', message: '"skip" should be of type "Number"',status:405 }
            else req.query.skip = parseInt(req.query.skip)

        }
        else req.query.skip = 0
        if (req.query.limit && req.query.limit != '') {
            let isNum:boolean = /^\d+$/.test(req.query.limit) && typeof req.query.limit !== 'object'
            if (!isNum)
                throw { error: 'Error Occured', message: '"limit" should be of type "Number"',status:405 }
            else req.query.limit = parseInt(req.query.limit)
        }
        else req.query.limit = 10
        res.send('Information has been fetched Successfully')
    }
    postMethodHandler = (req, res, next): void => {
        console.log('posthandler has beeen called', req.body);
        if (!req.body)
            throw { error: 'Error Occured', message: '"body" is not present' }
        if (!req.body.id || req.body.id === '')
            throw { error: 'Error Occured', message: '"id" is mandatory' ,status:405}
        else if (typeof req.body.id !== 'string')
            throw { error: 'Error Occured', message: '"id" should be of type String',status:405 }
        if (!req.body.name || req.body.name === '')
            throw { error: 'Error Occured', message: '"name" is mandatory',status:405 }
        else this.customValidator(req, 'create')
        res.send('Information has been saved Successfully')
    }
    putMethodHandler = (req, res, next): void => {
        console.log('puthandler has beeen called', req.body);
        if (!req.body)
            throw { error: 'Error Occured', message: '"body" is not present',status:405 }
        if (!req.body.id || req.body.id === '')
            throw { error: 'Error Occured', message: '"id" is mandatory',status:405 }
        else if (typeof req.body.id !== 'string')
            throw { error: 'Error Occured', message: '"id" should be of type String',status:405 }
        if (!req.body.dataToUpdate)
            throw { error: 'Error Occured', message: '"dataToUpdate" is mandatory',status:405 }
        else this.customValidator(req, 'update')
        res.send('Information has been Updated Successfully')
    }
    deleteMethodHandler = (req, res, next): void => {
        console.log('deletehandler has beeen called', req.params);
        if (!req.params.id || req.params.id === '')
            throw { error: 'Error Occured', message: '"id" is required',status:405 }
        else this.customValidator(req, 'delete')
        res.send('Information has been deleted Successfully')
    }
    private customValidator = (req, handlerType: string): void => {
        console.log('customValidator has beeen called');
        if (handlerType === 'create') {
            if (typeof req.body.name !== 'string')
                throw { error: 'Error Occured', message: '"name" should be of type String',status:405 }
        }
        else if (handlerType === 'update') {
            if (typeof req.body.dataToUpdate != 'object' || Array.isArray(req.body.dataToUpdate))
                throw { error: 'Error Occured', message: '"dataToUpdate" should be an Object(not even an Array)',status:405 }
            else if (!Object.keys(req.body.dataToUpdate).length)
                throw { error: 'Error Occured', message: '"dataToUpdate" Cannot be a blank Object',status:405 }
        }
        else if (handlerType === 'delete') {
            if (typeof req.params.id !== 'string')
                throw { error: 'Error Occured', message: '"id" should be of type String',status:405 }
        }
        else if (handlerType === 'get') {
            //no code added yet
        }
    }
}