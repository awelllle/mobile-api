import { Schema, model, Error, Document } from 'mongoose';

export interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
  userId: string;
  status: string;

}


export const JobseekerSchema = new Schema<UserInterface>(
  {
    email: String,
    name: String,
    password: String,
    userId: String,
    
   
  },
 
);

export const Jobseeker = model('Jobseeker', JobseekerSchema)
