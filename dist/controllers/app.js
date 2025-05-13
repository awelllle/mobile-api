"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const mongoose_1 = require("mongoose");
const utils_1 = require("../utils");
const jobseeker_1 = require("../models/jobseeker");
const job_1 = require("../models/job");
const nodemailer_1 = require("nodemailer");
const stripe_1 = require("stripe");
const stripe = new stripe_1.default('sk_test_26PHem9AhJZvU623DfE1x4sd', {
    apiVersion: '2023-10-16',
});
class AppController {
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body, 'body');
            return utils_1.default.helpers.sendSuccessResponse(res, [], 'User has been updated');
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
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.user, 'user details');
            const email = req.user.email.toLowerCase();
            jobseeker_1.Jobseeker.findOne({ email }, (err, user) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.log(err, 'user signup error');
                    return utils_1.default.helpers.sendErrorResponse(res, {}, 'Something went wrong, please try again');
                }
                if (user != null) {
                    return utils_1.default.helpers.sendSuccessResponse(res, user, 'User profile fetched');
                }
                else {
                    return utils_1.default.helpers.errorResponse(res, [], 'User does not exists');
                }
            }));
        });
    }
    createJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let job = new job_1.Job({
                title: req.body.title,
                company: req.body.company,
                companyImage: req.body.companyImage,
                tags: req.body.tags,
                description: req.body.description,
                postedBy: req.body.postedBy,
                date: Date.now,
            });
            yield job.save();
            return utils_1.default.helpers.sendSuccessResponse(res, [], 'job created');
        });
    }
    jobs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.query, 'Query');
            job_1.Job.find({}, (err, jobs) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.log(err, 'get job error');
                    return utils_1.default.helpers.sendErrorResponse(res, {}, 'Something went wrong, please try again');
                }
                return utils_1.default.helpers.sendSuccessResponse(res, jobs, 'jobs fetched');
            }));
        });
    }
    getJob(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = new mongoose_1.Types.ObjectId(req.params.id);
            console.log(id, 'Job ID from params'); // Log the id
            try {
                const job = yield job_1.Job.findById(id); // Fetch the job by ID
                if (!job) {
                    return utils_1.default.helpers.sendErrorResponse(res, {}, 'Job not found');
                }
                return utils_1.default.helpers.sendSuccessResponse(res, [{ job }], 'Job fetched successfully');
            }
            catch (error) {
                console.error('Error fetching job:', error);
                return utils_1.default.helpers.sendErrorResponse(res, {}, 'Something went wrong, please try again');
            }
        });
    }
    sendMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const required = [
                { name: 'message', type: 'string' },
                { name: 'to', type: 'string' },
            ];
            const { body } = req;
            const hasRequired = utils_1.default.helpers.validParam(body, required);
            if (hasRequired.success) {
                console.log(req.user.email, 'rr');
                let email = req.user.email.toLowerCase();
                let to = body.to.toLowerCase();
                try {
                    // Create a transporter
                    const transporter = (0, nodemailer_1.createTransport)({
                        service: 'gmail',
                        auth: {
                            user: process.env.EMAIL_USER,
                            pass: process.env.EMAIL_PASS, // Your email password or app-specific password
                        },
                    });
                    // Define the email options
                    const mailOptions = {
                        from: 'Bot" <awele.osuka@gmail.com>',
                        to: email,
                        subject: 'You just sent a message to ' + to,
                        text: `Hi, you sent the following message to ${to}: ${body.message}`, // Email body
                    };
                    // Send the email
                    const info = yield transporter.sendMail(mailOptions);
                    console.log('Email sent: ' + info.response);
                    return utils_1.default.helpers.sendSuccessResponse(res, [], 'Message sent successfully');
                }
                catch (error) {
                    console.error('Error sending email:', error);
                    return utils_1.default.helpers.sendErrorResponse(res, {}, 'Failed to send message');
                }
            }
            else {
                console.log(hasRequired.message);
                const message = hasRequired.message;
                return utils_1.default.helpers.sendErrorResponse(res, { message }, 'Missing required fields');
            }
        });
    }
}
exports.AppController = AppController;
//# sourceMappingURL=app.js.map