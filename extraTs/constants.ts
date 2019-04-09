import {User} from '../interfaces'
export class Constants {
    constructor() { }
   public permissions = {
        'getUsers': {
            all: ['head-trainer'],
            read: ['trainee', 'trainer'],
            write: ['trainer'],
            delete: [],
        }
    }
   public users:User[]= [
        {
            traineeEmail: 'trainee1@successive.tech',
            reviewerEmail: 'reviewer1@successive.tech',
        },
        {
            traineeEmail: 'trainee1@successive1.tech',
            reviewerEmail: 'reviewer1@successive.tech',
        }
    ]
}