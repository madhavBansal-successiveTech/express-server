import {daimond,equilateral} from './extra/patterns'
import {hasPermission,users,validateUsers} from './utils'
daimond(10);
equilateral(10);
 console.log('function to check permissions is running-------->')
if (hasPermission('getUsers', 'trainer', ['read', 'write']))
    console.log('The provided permission is correct')
else
    console.log('The provided permission is incorrect')
    console.log('function to validate users is running-------->')
    validateUsers(users);