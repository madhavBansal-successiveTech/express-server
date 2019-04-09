import {User} from '../interfaces'
import { Daimond,Equilateral } from './patterns/index';
import {CheckPermission,Validate} from './utils';
import {Constants} from './constants'
class Implementation{
    constructor(rowsForDaimond:number,rowsForTriangle:number,{moduleName, role, permissionType},users:User[]){
        this.printDaimondPattern(rowsForDaimond);
        this.printEquilateralPattern(rowsForTriangle);
        this.printPermission(moduleName, role, permissionType);
        this.printUsers(users);
    }
    printDaimondPattern=(rows:number):void=>{
        new Daimond().printPattern(rows);
    }
    printEquilateralPattern=(rows:number):void=>{
        new Equilateral().printEquiTriangle(rows);
    }
    printPermission=(moduleName:string, role:string, permissionType:string[]):void=>{
        console.log('function to check permissions is running-------->')
        if (new CheckPermission().hasPermission(moduleName, role, permissionType))
          console.log('The provided permission is correct')
        else
          console.log('The provided permission is incorrect')
    }
    printUsers=(users:User[]):void=>{
        console.log('function to validate users is running-------->')
        new Validate().validateUsers(users);
    }
}
new Implementation(10,10,{moduleName:'getUsers',role:'trainer',permissionType:['read', 'write']},new Constants().users)



