export interface User{
    traineeEmail:string,
    reviewerEmail:string

}
export interface Permission{
    moduleName:string,
    role:string,
    permissionType:string[]
}