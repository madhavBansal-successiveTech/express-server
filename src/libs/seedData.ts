import { UserData } from '../repositories/user/IUserModel'
import { UserModel } from '../repositories/user/UserModel'
import { VersionModel } from '../repositories/versionable/VersionModel'
import * as bcrypt from 'bcrypt'
import { config } from '../config/configuration'
export let insertSeedData = () => {
    let data: UserData = {
        id: '1',
        name: 'madhav',
        email: 'madhav.bansal@successive.tech',
        password: config.PASSWORD
    };
    UserModel.find().count().then((count:number) => {
        console.log(count, '--------------')
        if (count) console.log('seed data already present')
        else {
            bcrypt.hash(data.password, 10).then((hash:string) => {
                new UserModel({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    password: hash
                }).save().then((data) => {
                    console.log(data, 'data saved')
                    new VersionModel({
                        id: data._id,
                        createdOn: new Date(),
                        updatedOn: new Date()
                    }).save().then((data) => {
                        console.log(data, 'after saving seeding data versionable data isss')
                    }, (err) => {
                        console.log(err, 'error in Inserting seed data in VersionSchema')
                    })
                }, (err) => {
                    console.log(err, 'error in Inserting seed data')
                })
            }, (err) => {
                console.log('Error in Bcrypting')
            })


        }
    }, (err) => {
        console.log(err, 'error in getting seed data')
    })
}