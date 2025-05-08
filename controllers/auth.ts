import { Request, Response } from "express";

import { default as utils }from '../utils'
import {randomBytes} from 'crypto'

import { Jobseeker } from '../models/jobseeker';

import { isFuture } from 'date-fns'

export class AuthController {
    public async registerUser(req: Request & {user: any}, res: Response) {

      const required = [
        { name: 'email', type: 'string' },
        { name: 'password', type: 'string' },
       
      ]
      const { body } = req;
      const hasRequired = utils.helpers.validParam(body, required)
  
      if (hasRequired.success) {


        // const token = utils.auth.generateToken('awelle')   
        // return  res.status(200).json({token, userId: '1234567890'});

       let email: string = body.email.toLowerCase();
        Jobseeker.findOne({email}, async (err:Error, user) => {
            if (err){
                console.log(err, 'user signup error');
                return utils.helpers.sendErrorResponse(res, { }, 'Something went wrong, please try again')
            }

           if(user == null){ 

                    const id = randomBytes(60).toString('hex');

                    user = new Jobseeker({
                        email: email,
                        userId: id,
                        password: body.password,                 
                        
                      

                    })

                    await user.save();
                    const token = utils.auth.generateToken(user.email)
                    return utils.helpers.sendSuccessResponse(
                      res,
                      [{token}],
                      'signup successful',
                      )


            }else{

                return utils.helpers.errorResponse(
                  res,
                  [],
                  'User already exists',
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



public async signIn(req: Request & {user: any}, res: Response) {

  const required = [
    { name: 'email', type: 'string' },
    { name: 'password', type: 'string' },
  ]
  const { body } = req;
  console.log('body', body)
  const hasRequired = utils.helpers.validParam(body, required)

  if (hasRequired.success) {

     let email: string = body.email.toLowerCase();
     let password: string = body.password
    

    Jobseeker.findOne({email, password}, async (err:Error, user) => {
        if (err){
            return utils.helpers.sendErrorResponse(res, { }, 'Something went wrong, please try again')
        }

       if(user != null){ 

        const token = utils.auth.generateToken(user.email)

        return utils.helpers.sendSuccessResponse(
          res,
          [{token}],
          'login successful',
          )

       // return  res.status(200).json({token, userId: '1234567890'});

        }else{

            return utils.helpers.errorResponse(
              res,
              [],
              'Incorrect email or password',
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

