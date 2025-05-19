"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const fs = require("fs");
const utils_1 = require("../utils");
const cloudinary_1 = require("cloudinary");
const multer = require("multer");
//import { EmailNotification, SmsNotification } from '../models/dto/notification.dto';
// import {S3} from 'aws-sdk'
// const s3 = new S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// })
const cloudinaryClient = cloudinary_1.v2;
cloudinaryClient.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
});
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdir('./uploads/', (err) => {
            cb(null, './uploads/');
        });
    },
    filename: function (req, file, cb) {
        //console.log(file)
        cb(null, file.originalname);
    }
});
class MediaController {
    upload(req, res) {
        const upload = multer({ storage }).single('file');
        upload(req, res, function (err) {
            if (err) {
                // console.log(err, 'upload error, multer')
                try {
                    //utils.sendNotification(notification);
                }
                catch (e) {
                    console.error(e);
                }
                console.log(err, 'cloudinary error');
                return utils_1.default.helpers.sendErrorResponse(res, '', 'Something went wrong');
            }
            console.log(req.file, 'filey');
            const path = req.file.path;
            const uniqueFilename = new Date().toISOString();
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
            cloudinary_1.v2.uploader.upload(path, { folder: `Jobbify/${uniqueFilename}`, resource_type: 'auto', }, function (err, image) {
                if (err) {
                    console.log(err, 'upload error');
                    return utils_1.default.helpers.sendErrorResponse(res, '', 'Something went wrong');
                }
                fs.unlinkSync(path);
                console.log(image, 'image details');
                const fileDetails = {
                    url: image.secure_url,
                    type: image.resource_type,
                };
                return utils_1.default.helpers.sendSuccessResponse(res, [{ fileDetails }], 'File Uploaded');
            });
        });
    }
}
exports.MediaController = MediaController;
//# sourceMappingURL=media.js.map