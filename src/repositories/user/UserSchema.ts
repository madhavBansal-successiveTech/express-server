import * as mongoose from 'mongoose';
export let UserSchema=new mongoose.Schema({
  id:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})
