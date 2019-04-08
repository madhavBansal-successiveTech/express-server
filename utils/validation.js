import {validateEmail} from './helpers'
export default function validateUsers(users){
    let validUsers = [], inValidUsers = [];
    users.forEach((user) => {
        if (validateEmail(user)) 
            validUsers.push(user); 
        else
            inValidUsers.push(user);
        
    })
    console.log(`Total valid users are: ${validUsers.length}`)
    console.log(`Total Invalid users are: ${inValidUsers.length}`)
    if (validUsers.length)
    {
        console.log('Valid users are:')
        console.log(validUsers)
    }  
    if (inValidUsers.length)
    {
        console.log('InValid users are:')
        console.log(inValidUsers)
    }
   


}
