let permissions = {
    'getUsers': {
        all: ['head-trainer'],
        read: ['trainee', 'trainer'],
        write: ['trainer'],
        delete: [],
    }
}
let hasPermission = (moduleName, role, permissionType) => {
    let find_index = (value) => {
        return value.toLowerCase() === role.toLowerCase()
    }
    if (permissions.hasOwnProperty(moduleName)) {
        for(permission in permissionType){
            if (permissions[moduleName].hasOwnProperty(permissionType[permission])) {
                let index = permissions[moduleName][permissionType[permission]].findIndex(find_index)
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
if (hasPermission('getUsers', 'trainer', ['read', 'write']))
    console.log('The provided permission is correct')
else
    console.log('The provided permission is incorrect')