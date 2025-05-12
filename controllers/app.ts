import { Request, Response } from "express";
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

                  return utils.helpers.sendSuccessResponse(
                    res,
                    [],
                    'User has been updated',
                    )

  // const required = [
  //   { name: 'name', type: 'string' },
  //   { name: 'username', type: 'string' },

  // ]
  // const { body } = req;
  // const hasRequired = utils.helpers.validParam(body, required)

  // if (hasRequired.success) {
  //   console.log(req.user.email, 'rr')
  //   let email: string = req.user.email.toLowerCase();

  //   Jobseeker.findOne({email}, async (err:Error, user) => {
  //       if (err){
  //           console.log(err, 'user signup error');
  //           return utils.helpers.sendErrorResponse(res, { }, 'Something went wrong, please try again')
  //       }

  //      if(user != null){ 

               
  //           Jobseeker.updateOne(
  //             { email: email}, {
  //             $set: {
  //                 name: body.name,
  //                 username: body.username
  //             },
  //         }, (err, updated) => {
          
  //             if (err) {
  //                 console.log(err);
  //                 return utils.helpers.errorResponse(
  //                   res,
  //                   [],
  //                   'Something went wrong, please try again',
  //                   )
  //             }
              
  //                 return utils.helpers.sendSuccessResponse(
  //                   res,
  //                   [],
  //                   'User has been updated',
  //                   )


             
  //           });


             


  //       }else{

  //           return utils.helpers.errorResponse(
  //             res,
  //             [],
  //             'User does not exists',
  //             )
      
  
  //       }
            
        
  //   })
  
  // }else{

  //   console.log(hasRequired.message)
  //   const message = hasRequired.message
  // return utils.helpers.sendErrorResponse(
  //   res,
  //   { message },
  //   'Missing required fields',
  //   )

  // }
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
      // Create a transporter
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