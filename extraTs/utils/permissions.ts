import { Constants } from '../constants'
export default class CheckPermission {
    permissions
    constructor() {
        this.permissions = new Constants().permissions;
    }
   
   public hasPermission = (moduleName:string, role:string, permissionType:string[]):boolean => {
        let find_index = (value:string):boolean => {
            return value.toLowerCase() === role.toLowerCase()
        }
        if (this.permissions.hasOwnProperty(moduleName)) {
            for (let permission in permissionType) {
                if (this.permissions[moduleName].hasOwnProperty(permissionType[permission])) {
                    let index:number = this.permissions[moduleName][permissionType[permission]].findIndex(find_index)
                    if (index === -1) {
                        console.log(`Permission "${permissionType[permission]}" is not given for the role "${role}"`);
                        return false;
                    }

                }
                else {//if user has provided permissions apart from all/read/write/delete
                    console.log(`"${permissionType[permission]}" permission does not exist`)
                    return false;
                }
            }
            return true;
        }
        else {
            console.log(`Module Name "${moduleName}" not found in permissions`);
            return false;
        }
    }
}
