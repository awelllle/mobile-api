import { Request, Response } from "express";
import { Types } from 'mongoose'; 
import { default as utils }from '../utils'
import { Jobseeker } from '../models/jobseeker';
import { Job, JobSchema } from '../models/job';
import {createTransport} from 'nodemailer';

import Stripe from 'stripe';
import { body } from "express-validator";

const stripe = new Stripe('sk_test_26PHem9AhJZvU623DfE1x4sd', {
  apiVersion: '2023-10-16', 
});

export class AppController {
 
public async updateUser(req: Request & {user: any}, res: Response) {

  console.log(req.body, 'body')
  const email: string = req.user.email.toLowerCase(); // Get the user's email from the request

  try {
    // Find the user by email and update their details
    const updatedUser = await Jobseeker.findOneAndUpdate(
      { email }, // Find the user by email
      {
        $set: {
          name: req.body.name,
          bio: req.body.bio,
          profileImage: req.body.profileImage,
          location: req.body.location,
          skills: req.body.skills,
          portfolio: req.body.portfolio,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return utils.helpers.sendErrorResponse(res, {}, 'User not found');
    }

    return utils.helpers.sendSuccessResponse(
      res,
      [],
      'User updated successfully'
    );
  } catch (error) {
    console.error('Error updating user:', error);
    return utils.helpers.sendErrorResponse(
      res,
      {},
      'Failed to update user, please try again'
    );
  }
                 
  

             


}


public async profile(req: Request & {user: any}, res: Response) {

  console.log(req.user, 'user details')

  const email: string = req.user.email.toLowerCase();

         Jobseeker.findOne({email}, async (err:Error, user) => {
        if (err){
            console.log(err, 'user signup error');
            return utils.helpers.sendErrorResponse(res, { }, 'Something went wrong, please try again')
        }

       if(user != null){ 
            return utils.helpers.sendSuccessResponse(
              res,
              user,
              'User profile fetched',
              )
       }else{
            return utils.helpers.errorResponse(
              res,
              [],
              'User does not exists',
              )
       }
      });
       


}

public async createJob(req: Request & {user: any}, res: Response) {

                    let job = new Job({
                      title: req.body.title,
                      company: req.body.company,
                      companyImage: req.body.companyImage,
                      tags: req.body.tags,
                      description: req.body.description,
                      postedBy: req.body.postedBy,
                      date: Date.now,                
                                            
                                          
                    
                                        })
  
                      await job.save();
                    
                      return utils.helpers.sendSuccessResponse(
                        res,
                        [],
                        'job created',
                        )

}

public async jobs(req: Request & {user: any}, res: Response) {

    console.log(req.query, 'Query');

    Job.find({}, async (err:Error, jobs) => {
        if (err){
            console.log(err, 'get job error');
            return utils.helpers.sendErrorResponse(res, { }, 'Something went wrong, please try again')
        }

        return utils.helpers.sendSuccessResponse(
                            res,
                            jobs,
                            'jobs fetched',
                            )

      });

}

public async getJob(req: Request & {user: any}, res: Response) {

 
  let id = new Types.ObjectId( req.params.id); 
  
  console.log(id, 'Job ID from params'); // Log the id

  try {
    const job = await Job.findById(id); // Fetch the job by ID
    if (!job) {
      return utils.helpers.sendErrorResponse(res, {}, 'Job not found');
    }

    return utils.helpers.sendSuccessResponse(res, [{job}], 'Job fetched successfully');
  } catch (error) {
    console.error('Error fetching job:', error);
    return utils.helpers.sendErrorResponse(res, {}, 'Something went wrong, please try again');
  }

}



public async sendMessage(req: Request & { user: any }, res: Response) {
  const required = [
    { name: 'message', type: 'string' },
    { name: 'to', type: 'string' },
  ];
  const { body } = req;
  const hasRequired = utils.helpers.validParam(body, required);

  if (hasRequired.success) {
    console.log(req.user.email, 'rr');
    let email: string = req.user.email.toLowerCase();
    let to: string = body.to.toLowerCase();

    try {
      // Create a transporter (nodemailer instance)
      const transporter = createTransport({
        service: 'gmail', // You can use other services like Outlook, Yahoo, etc.
        auth: {
          user: process.env.EMAIL_USER, // Your email address
          pass: process.env.EMAIL_PASS, // Your email password or app-specific password
        },
      });

      // Define the email options
      const mailOptions = {
        from: 'Bot" <awele.osuka@gmail.com>',
        to: email, // Recipient's email address
        subject: 'You just sent a message to ' + to, // Email subject
        text: `Hi, you sent the following message to ${to}: ${body.message}`, // Email body
      };

      // Send the email
      const info = await transporter.sendMail(mailOptions);

      console.log('Email sent: ' + info.response);

      return utils.helpers.sendSuccessResponse(
        res,
        [],
        'Message sent successfully'
      );
    } catch (error) {
      console.error('Error sending email:', error);
      return utils.helpers.sendErrorResponse(
        res,
        {},
        'Failed to send message'
      );
    }
  } else {
    console.log(hasRequired.message);
    const message = hasRequired.message;
    return utils.helpers.sendErrorResponse(
      res,
      { message },
      'Missing required fields'
    );
  }
}

}