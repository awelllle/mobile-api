import { Schema, model, Error, Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';
type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

export interface profileImage {
  uri: string;
  type: string;
  name: string;
  
}


export interface location {
  country: string;
  city: string;
 
  
}

export interface skills {
  category: string;
  name: string;
  
}

export interface portfolio {
  title: string;
  description: string;
  media: {
    uri: string;
    type: "image" | "video" | "audio";
  };
  tags?: string[];
  
}

export interface UserInterface extends Document {
  name: string;
  email: string;

  bio: string;
  profileImage: profileImage;
  location: location;
  skills: skills[];
  portfolio: portfolio[];


  password: string;
  userId: string;
  status: string;

}


export const JobseekerSchema = new Schema<UserInterface>(
  {
    email: String,
    name: String,

    bio: String,
    profileImage: {
      type: Object,
      default: {
        uri: '',
        type: '',
        name: ''
      }
    },
    location: {
      type: Object, // Define location as an object
      default: {
        country: '',
        city: ''
      }
    },
    skills: Array<skills>,
    portfolio: Array<portfolio>,


    password: String,
    userId: String,
    
   
  },
 
);

JobseekerSchema.pre("save", function save(next) {
  const user = this;
  
  if (!user.isModified("password")) { return next(); }
  
  bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err); }
      bcrypt.hash(user.password, salt, (err: Error, hash) => {
      if (err) { 
          return next(err); 
      }
      user.password = hash;
      next();
      });
  });
});

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
      cb(err, isMatch);
  });
};
JobseekerSchema.methods.comparePassword = comparePassword;

export const Jobseeker = model('Jobseeker', JobseekerSchema)
