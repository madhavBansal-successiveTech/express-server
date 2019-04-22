import * as jwt from 'jsonwebtoken';
import { UserRepository } from '../../repositories/user/UserRepository'
import CheckPermission from '../../../extraTs/utils/permissions'
import { Database } from '../Database'
import { config } from '../../config/configuration'
import * as bcrypt from 'bcrypt';
export let authMiddleWare = (moduleName: string, permissionType: string[]) => (req, res, next) => {
    jwt.verify(req.headers.authorization, config.SECRETKEY, (err: Error, user) => {
        if (err)
            throw { error: 'Error Occured', message: "Provided Token is Incorrect", status: 403 }

        else {
            let params = { email: user.email }
            new UserRepository().get(params, true, null, null).then((data) => {
                if (!data.length)
                    next({ err: 'Unathorized access', message: "Unauthorized Access", status: 403 })
                else {
                    //assumption:Email id of each user is unique
                    bcrypt.compare(user.password, data[0].password).then((res) => {
                        if (!res)
                            next({ err: 'Unathorized access', message: "Unauthorized Access", status: 404 })
                        else {
                            let hasPermission: boolean = new CheckPermission().hasPermission(moduleName, user.role, permissionType)
                            if (hasPermission)
                                next();
                            else
                                next({ error: 'Error Occured', message: `Sorry,User ${user.name} don't have the Permission`, status: 403 })
                        }
                    }, (err) => {
                        next({ err: err.name, message: err.message, status: 406 })
                    })
                }
            }, (err) => {
                next({ error: err.error, message: err.message, status: err.status })

            })
        }
    })




}