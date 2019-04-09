import { User } from "../../interfaces";

export class ValidateEmail{
    constructor(){}
   protected validateEmail = ({traineeEmail,reviewerEmail}:User):boolean => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (re.test(String(traineeEmail).toLowerCase()) && traineeEmail.endsWith('@successive.tech') && String(reviewerEmail).toLowerCase() && reviewerEmail.endsWith('@successive.tech'));
    }
} 