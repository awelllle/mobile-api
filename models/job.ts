import { Schema, model, Error, Document } from 'mongoose';

export interface JobInterface extends Document {
  title: string;
  company: string;
  companyImage: string;
  tags: {type:Array<string>, default: []};
  description: string;
  postedBy: string;
  
  created: { type: Date },

}


export const JobSchema = new Schema<JobInterface>(
  {
    title: String,
  company: String,
  companyImage: String,
  tags: Array,
  description: String,
  postedBy: String,

  created: Date,
   
  },
 
);

export const Job = model('Job', JobSchema)
