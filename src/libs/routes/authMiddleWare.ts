import * as jwt from 'jsonwebtoken';
import CheckPermission from '../../../extraTs/utils/permissions'
export let authMiddleWare = (moduleName: string, permissionType: string[]) => (req, res, next) => {
    jwt.verify(req.headers.authorization, 'qwertyuiopasdfghjklzxcvbnm123456', (err:Error, user) => {
        if (err) {
            throw { error: 'Error Occured', message: "Unauthorized Access", status: 403 }
        }

        else {
            console.log(user, 'sucessssss');
            let hasPermission:boolean = new CheckPermission().hasPermission(moduleName, user.role, permissionType)
            if (hasPermission)
                next();
            else
                throw { error: 'Error Occured', message: `Sorry,User ${user.name} don't have the Permission for the role ${user.role}`, status: 403 }
        }
    })




}