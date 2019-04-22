import * as mongoose from 'mongoose';
export let VersionableSchema = new mongoose.Schema({
  id: { type: String, required: true },
  createdOn: { type: Date, required: true },
  updatedOn: { type: Date, required: true }

})
