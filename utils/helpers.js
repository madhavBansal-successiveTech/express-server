export let validateEmail = ({traineeEmail,reviewerEmail}) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (re.test(String(traineeEmail).toLowerCase()) && traineeEmail.endsWith('@successive.tech') && String(reviewerEmail).toLowerCase() && reviewerEmail.endsWith('@successive.tech'));
}