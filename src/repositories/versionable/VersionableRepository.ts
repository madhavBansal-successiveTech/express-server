import { VersionModel } from './VersionModel'
import { UserModel } from '../user/UserModel'
import { IVersoinable } from './IVersionableModel';
export class VersionableRepository {
    modelName
    modelType
    constructor(modelName, modelType) {
        this.modelType = modelType
        this.modelName = modelName
    }
    async create(data) {
        let newUser;
        let DATA = {}
        if (this.modelName === 'user') {
            newUser = new UserModel({
                id: data.id,
                name: data.name,
                email: data.email,
                password: data.password
            })
        }
        else {
            //for other models,yet there are no other models
        }
        await newUser.save().then((success) => {
            DATA = success;
            new VersionModel({
                id: success._id,
                createdOn: new Date(),
                updatedOn: new Date()
            }).save().then((success) => {
                console.log('data inserted in Versionable Schema Successfully', success)
            }, (err) => {
                console.log(`Error while saving data in Versionable Schema.Err:  ${err}`)
                throw { err: err.name, message: err.message, status: 406 }
            })
        }, (err) => {
            console.log(`Error while saving data of User  ${err}`)
            throw { err: err.name, message: err.message, status: 406 }
        })
        return DATA;
    }
    async update(params) {
        let data = {}
        console.log(params.id, 'iddddd', params.dataToUpdate);
        await this.modelType.findByIdAndUpdate(params.id, params.dataToUpdate, { new: true }).then(async (success) => {
            data = success;
            console.log(data, 'ddddddd')
            if (success) {
                await VersionModel.findOne({ id: success._id }).then(async (success) => {
                    if (success) {
                        let dataToUpdate = { updatedOn: new Date() }
                        await VersionModel.findByIdAndUpdate(success._id, dataToUpdate, { new: true }).then((success) => {
                            console.log('data in VersionModel has been updated successfully', success)
                        }, (err) => {
                            throw { err: err.name, message: err.message, status: 406 }
                        })
                    }
                    else {
                        throw { err: 'VersionableNotSynced', message: 'Versionable Schema not synced with Other Schema', status: 406 }
                    }
                }, (err) => {
                    console.log(err, 'error in finding data from Versionable Schema');
                    throw { err: err.name, message: err.message, status: 406 }
                })
            }
            console.log('hureeeeeee')
        }, (err) => {
            console.log(err, 'error in updating data');
            throw { err: err.name, message: err.message, status: 406 }
        })
        return data;
    }
    async delete(id: number) {
        let deletedId;
        await this.modelType.findByIdAndRemove(id).then(async (success) => {
            if (success) {
                deletedId = success._id;
                VersionModel.remove({ id: deletedId }).then(async (success) => {
                    console.log('data deleted from VersionSchema', success)
                }, async (err) => {
                    throw { err: err.name, message: err.message, status: 406 }
                })
            }
        }, (err) => {
            throw { err: err.name, message: err.message, status: 406 }
        })
        return deletedId;
    }
    async get(query, singleFetch, limit, skip) {
        let data = [];
        if (singleFetch) {
            await this.modelType.findOne(query).limit(limit).skip(skip).then((result) => {
                if (result) data.push(result);
            }, (err) => {
                throw { err: err.name, message: err.message, status: 406 }
            })
        }
        else {
            await this.modelType.find(query).limit(limit).skip(skip).then((result) => {
                if (result.length)
                    data = result;
            }, (err) => {
                throw { err: err.name, message: err.message, status: 406 }
            })
        }
        return data;
    }
}