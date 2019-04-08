import { ValidateEmail } from './helpers';
import { User } from '../../interfaces';
export default class Validate extends ValidateEmail {
    constructor() {
        super();
    }
    public validateUsers = (users: User[]):void => {
        let validUsers: User[] = [], inValidUsers: User[] = [];
        users.forEach((user: User) => {
            if (this.validateEmail(user))
                validUsers.push(user);
            else
                inValidUsers.push(user);

        })
        console.log(`Total valid users are: ${validUsers.length}`)
        console.log(`Total Invalid users are: ${inValidUsers.length}`)
        if (validUsers.length) {
            console.log('Valid users are:')
            console.log(validUsers)
        }
        if (inValidUsers.length) {
            console.log('InValid users are:')
            console.log(inValidUsers)
        }

    }
}
