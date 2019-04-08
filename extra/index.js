import{daimond as printDaimondPattern ,equilateral as printEquilateralPattern} from './patterns/index';
import{hasPermission,validateUsers} from '../utils';
import {permissions,users} from './constants'
printEquilateralPattern(10);
printDaimondPattern(10);
  console.log('function to check permissions is running-------->')
if (hasPermission('getUsers', 'trainer', ['read', 'write']))
    console.log('The provided permission is correct')
else
    console.log('The provided permission is incorrect')
    console.log('function to validate users is running-------->')
    validateUsers(users);