import { Request, Response } from "express";

import { default as utils }from '../utils'
import {randomBytes} from 'crypto'

import { User } from '../models/user';

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


        const token = utils.auth.generateToken('awelle')   
        return  res.status(200).json({token, userId: '1234567890'});
        
       // let email: string = body.email.toLowerCase();
        // User.findOne({email}, async (err:Error, user) => {
        //     if (err){
        //         console.log(err, 'user signup error');
        //         return utils.helpers.sendErrorResponse(res, { }, 'Something went wrong, please try again')
        //     }

        //    if(user == null){ 

        //             const id = randomBytes(60).toString('hex');

        //             user = new User({
        //                 email: email,
        //                 userId: id,
        //                 name: body.name,                 
        //                 username: body.username,
                      

        //             })

        //             await user.save();
        //             const token = utils.auth.generateToken(user.email)
        //           return  res.status(200).json({token: token});


        //     }else{

        //         return utils.helpers.errorResponse(
        //           res,
        //           [],
        //           'User already exists',
        //           )
          
      
        //     }
                
            
        // })
      
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
  const hasRequired = utils.helpers.validParam(body, required)

  if (hasRequired.success) {

  
           const token = utils.auth.generateToken('awelle')   
           return  res.status(200).json({token, userId: '1234567890'});
        

    // let username: string = body.username.toLowerCase();
    // let accessType: string = body.accessType.toLowerCase();
    

    //const types = ['user', 'merchant'];
   

    // if(!types.includes(accessType)){
    //   return utils.helpers.errorResponse(
    //     res,
    //     [],
    //     'Invalid parameter for access type',
    //     )
    
    // }

    // var userType

    // if(accessType === 'user'){
    //   userType = User
    // }else{
    //   userType = Merchant
    // }


    // userType.findOne({username}, async (err:Error, user) => {
    //     if (err){
    //         return utils.helpers.sendErrorResponse(res, { }, 'Something went wrong, please try again')
    //     }

    //    if(user != null){ 

    //     const token = utils.auth.generateToken(user.username)

    //     if(accessType === 'user'){
    //        return  res.status(200).json({token, userId: user.id});
    //     }else{
    //       return  res.status(200).json({token, merchantId: user.id});
    //     }



    //     }else{

    //         return utils.helpers.errorResponse(
    //           res,
    //           [],
    //           'User does not exist',
    //           )
      
  
    //     }
            
        
    // })
  
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

