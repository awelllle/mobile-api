import { Request, Response } from "express";
import { default as utils }from '../utils'
import { Jobseeker, UserInterface } from '../models/jobseeker';

import Stripe from 'stripe';

const stripe = new Stripe('sk_test_26PHem9AhJZvU623DfE1x4sd', {
  apiVersion: '2023-10-16', 
});

export class AppController {
 
public async updateUser(req: Request & {user: any}, res: Response) {

  const required = [
    { name: 'name', type: 'string' },
    { name: 'username', type: 'string' },

  ]
  const { body } = req;
  const hasRequired = utils.helpers.validParam(body, required)

  if (hasRequired.success) {
    console.log(req.user.email, 'rr')
    let email: string = req.user.email.toLowerCase();

    Jobseeker.findOne({email}, async (err:Error, user) => {
        if (err){
            console.log(err, 'user signup error');
            return utils.helpers.sendErrorResponse(res, { }, 'Something went wrong, please try again')
        }

       if(user != null){ 

               
            Jobseeker.updateOne(
              { email: email}, {
              $set: {
                  name: body.name,
                  username: body.username
              },
          }, (err, updated) => {
          
              if (err) {
                  console.log(err);
                  return utils.helpers.errorResponse(
                    res,
                    [],
                    'Something went wrong, please try again',
                    )
              }
              
                  return utils.helpers.sendSuccessResponse(
                    res,
                    [],
                    'User has been updated',
                    )


             
            });


             


        }else{

            return utils.helpers.errorResponse(
              res,
              [],
              'User does not exists',
              )
      
  
        }
            
        
    })
  
  }else{

    console.log(hasRequired.message)
    const message = hasRequired.message
  return utils.helpers.sendErrorResponse(
    res,
    { message },
    'Missing required fields',
    )

  }
}




}