import { Schema, model, Error, Document } from 'mongoose';

export interface UserInterface extends Document {
  name: string;
  email: string;
  username: string,
  userId: string;
  status: string;

}


export const UserSchema = new Schema<UserInterface>(
  {
    email: String,
    name: String,
    username: String,
    userId: String,
    status: {type: String, default:'unpaid'},
   
  },
 
);

export const User = model('User', UserSchema)
