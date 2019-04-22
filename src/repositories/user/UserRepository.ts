import { UserModel } from '../user/UserModel'
import { UserData } from './IUserModel';
import { VersionableRepository } from '../versionable/VersionableRepository'
export class UserRepository {
    constructor() { }
    async create(data: UserData) {
        let DATA = {}
        await new VersionableRepository('user',UserModel).create(data).then((success) => {
            DATA = success;
        }, (err) => {
            throw err
        })
        return DATA;
    }
    async update(params) {
        let data = {}
        await new VersionableRepository('user',UserModel).update(params).then((success) => {
            data = success;
        }, (err) => {
            throw err;
        })
        return data;
    }
    async delete(id) {
        let deletedId;
        await new VersionableRepository('user',UserModel).delete(id).then((success) => {
            deletedId = success;
        }, (err) => {
            throw err
        })
        return deletedId;
    }
    async get(query, singleFetch, limit, skip) {
        let data = [];
      await  new VersionableRepository('user',UserModel).get(query, singleFetch, limit, skip).then((success) => {
            data = success;
        }, (err) => {
            throw err
        })
        return data;

    }
}