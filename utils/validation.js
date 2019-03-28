export let users = [
    {
        traineeEmail: 'trainee1@successive.tech',
        reviewerEmail: 'reviewer1@successive.tech',
    },
    {
        traineeEmail: 'trainee1@successive1.tech',
        reviewerEmail: 'reviewer1@successive.tech',
    }
]
let validateEmail = ({traineeEmail,reviewerEmail}) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (re.test(String(traineeEmail).toLowerCase()) && traineeEmail.endsWith('@successive.tech') && String(reviewerEmail).toLowerCase() && reviewerEmail.endsWith('@successive.tech'));
}
export let validateUsers = (users) => {
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
