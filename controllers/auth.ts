import { Request, Response } from "express";

import { default as utils }from '../utils'
import {randomBytes} from 'crypto'

import { Jobseeker } from '../models/jobseeker';

import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


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

            

                    user = new Jobseeker({
                        email: email,
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
    

    Jobseeker.findOne({email}, async (err:Error, user) => {
        if (err){
            return utils.helpers.sendErrorResponse(res, { }, 'Something went wrong, please try again')
        }

        //console.log(user, 'user found')

       if(user != null){ 
          user.comparePassword(password.toString(),async (error, isMatch) => {
              if (error) {
                return utils.helpers.sendErrorResponse(
                  res,
                  {},
                  "Email or password incorrect"
                );
              }
              if (isMatch) {
                const token = utils.auth.generateToken(user.email)

                return utils.helpers.sendSuccessResponse(
                  res,
                  [{token}],
                  'login successful',
                  )

              }
            });

          


       

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


public async loginWithGoogle(req: Request & { user: any }, res: Response) {
  const { idToken } = req.body;

  if (!idToken) {
    return utils.helpers.sendErrorResponse(res, {}, 'Google ID token is required');
  }

  try {
   // console.log('Expected audience:', process.env.GOOGLE_CLIENT_ID);
    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID, // Replace with your Google Client ID
    });

    const payload = ticket.getPayload();
    console.log('Payload audience:', payload?.aud); // Log the audience

    if (!payload) {
      return utils.helpers.sendErrorResponse(res, {}, 'Invalid Google ID token');
    }

    const email = payload.email?.toLowerCase();
    const name = payload.name;
    const googleId = payload.sub; // Google user ID

    if (!email) {
      return utils.helpers.sendErrorResponse(res, {}, 'Google account email is required');
    }

    // Check if the user already exists
    Jobseeker.findOne({ email }, async (err: Error, user) => {
      if (err) {
        console.error(err, 'Error finding user');
        return utils.helpers.sendErrorResponse(res, {}, 'Something went wrong, please try again');
      }

      if (!user) {
        // If user doesn't exist, create a new one
        const id = randomBytes(60).toString('hex');
        user = new Jobseeker({
          email,
          userId: id,
          name,
          googleId,
        });

        await user.save();
      }

      // Generate a token for the user
      const token = utils.auth.generateToken(user.email);

      return utils.helpers.sendSuccessResponse(
        res,
        [{ token }],
        'Google login successful'
      );
    });
  } catch (error) {
    console.error(error, 'Google login error');
    return utils.helpers.sendErrorResponse(res, {}, 'Failed to authenticate with Google');
  }
}


}