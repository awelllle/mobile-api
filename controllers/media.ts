import * as fs from 'fs';
import { Request, Response } from 'express';

import { default as utils }from '../utils'
import { v2 as cloudinary } from 'cloudinary'
import * as multer  from 'multer'
//import { EmailNotification, SmsNotification } from '../models/dto/notification.dto';

// import {S3} from 'aws-sdk'

// const s3 = new S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// })

const cloudinaryClient = cloudinary
cloudinaryClient.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true
})


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

 const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      fs.mkdir('./uploads/', (err)=>{
        cb(null, './uploads/');
     });

    },
    filename: function(req, file, cb) {
      //console.log(file)
      cb(null, file.originalname)
    }
  })



export class MediaController {
    public upload  (req: Request & {user: any}, res: Response) {

            const upload = multer({ storage }).single('file')
            upload(req, res, function(err) {
                if (err) {
                 // console.log(err, 'upload error, multer')
                 
        
                  try {
                     //utils.sendNotification(notification);
                  } catch (e) {
                    console.error(e);
                  }
                  console.log(err, 'cloudinary error')
                  return utils.helpers.sendErrorResponse(res, '', 'Something went wrong')
                }
              
                const path = req.file.path
               // console.log(req.file, 'filey')
                const uniqueFilename = new Date().toISOString()
               // const folder = 'test'//req.user.companyName.replace(/[^a-zA-Z0-9]/g, '')

                // const params = {
                //   Bucket: process.env.AWS_BUCKET_NAME,
                //   Key: `${req.file.filename}`,
                //   Body: path,
                //   // ContentDisposition:"inline",
                //   // ContentType: `${req.file.mimetype}`
                // }
                
                // s3.upload(params, (err, data) => {
                //   if (err) {
                //     console.log(err)
                //   }
                //   console.log(data)
                //   return utils.helpers.sendErrorResponse(res, '', '')
                // })

                cloudinary.uploader.upload(
                path,
                { folder: `Jobbify/${uniqueFilename}`,  resource_type: 'auto', }, 
                function(err, image) {
                      if (err) {
                      //console.log(err, req.user, 'upload err, cloudinary')

                      // const notification: EmailNotification = {
                      //   type: "email",
                      //   from: "no-reply@pivo.africa",
                      //   to: 'awelle@pivo.africa',
                      //   subject: "Upload error -  Cloudinary",
                      //   message: `${err.message} - Filename: ${req.file.filename}, Type of Document: ${req.file.mimetype} User:${req.user.companyName}`,
                      //   templateId: "",
                      //   vars: {
                      //     //code: `${err.message} - ${req.user.companyName}`,
                      //   },
                      // };
            
                      try {
                        // utils.sendNotification(notification);
                      } catch (e) {
                        console.error(e);
                      }
                        return utils.helpers.sendErrorResponse(res, '', 'Something went wrong')
                    }
                   
                    fs.unlinkSync(path);
                    console.log(image, 'image details')
                    const fileDetails = {
                      url: image.secure_url,
                      type: image.resource_type,
                    }
                    return utils.helpers.sendSuccessResponse(res, [{fileDetails}], 'File Uploaded')
                }
                )


            })
    }


//     public async uploadCsv  (req: Request & {user: any}, res: Response) {

//       const upload = multer({ storage }).single('file')
//       upload(req, res, function(err) {
//           if (err) {
//             console.log(err, 'multer upload error')
//             return utils.helpers.sendErrorResponse(res, err, 'Something went wrong')
//           }
        
//           const path = req.file.path
//           console.log(req.file, 'filey')
//           const uniqueFilename = new Date().toISOString()

//           cloudinary.uploader.upload(
//           path,
//           { folder: `Pivo/${req.user.companyName}/${uniqueFilename}`, resource_type: "auto"  }, 
//           function(err, image) {
//               if (err) {
//                 console.log(err, 'upload error')
//                   return utils.helpers.sendErrorResponse(res, err, 'Something went wrong')
//               }
             
//               fs.unlinkSync(path);
//               return utils.helpers.sendSuccessResponse(res, image.secure_url, 'Image details')
//           }
//           )


//       })
// }

}