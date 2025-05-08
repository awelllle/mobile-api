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
exports.AuthController = void 0;
const utils_1 = require("../utils");
const crypto_1 = require("crypto");
const jobseeker_1 = require("../models/jobseeker");
class AuthController {
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const required = [
                { name: 'email', type: 'string' },
                { name: 'password', type: 'string' },
            ];
            const { body } = req;
            const hasRequired = utils_1.default.helpers.validParam(body, required);
            if (hasRequired.success) {
                // const token = utils.auth.generateToken('awelle')   
                // return  res.status(200).json({token, userId: '1234567890'});
                let email = body.email.toLowerCase();
                jobseeker_1.Jobseeker.findOne({ email }, (err, user) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log(err, 'user signup error');
                        return utils_1.default.helpers.sendErrorResponse(res, {}, 'Something went wrong, please try again');
                    }
                    if (user == null) {
                        const id = (0, crypto_1.randomBytes)(60).toString('hex');
                        user = new jobseeker_1.Jobseeker({
                            email: email,
                            userId: id,
                            password: body.password,
                        });
                        yield user.save();
                        const token = utils_1.default.auth.generateToken(user.email);
                        return utils_1.default.helpers.sendSuccessResponse(res, [{ token }], 'signup successful');
                    }
                    else {
                        return utils_1.default.helpers.errorResponse(res, [], 'User already exists');
                    }
                }));
            }
            else {
                console.log(hasRequired.message);
                const message = hasRequired.message;
                return utils_1.default.helpers.sendErrorResponse(res, { message }, 'Missing required fields');
            }
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const required = [
                { name: 'email', type: 'string' },
                { name: 'password', type: 'string' },
            ];
            const { body } = req;
            console.log('body', body);
            const hasRequired = utils_1.default.helpers.validParam(body, required);
            if (hasRequired.success) {
                let email = body.email.toLowerCase();
                let password = body.password;
                jobseeker_1.Jobseeker.findOne({ email, password }, (err, user) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return utils_1.default.helpers.sendErrorResponse(res, {}, 'Something went wrong, please try again');
                    }
                    if (user != null) {
                        const token = utils_1.default.auth.generateToken(user.email);
                        return utils_1.default.helpers.sendSuccessResponse(res, [{ token }], 'login successful');
                        // return  res.status(200).json({token, userId: '1234567890'});
                    }
                    else {
                        return utils_1.default.helpers.errorResponse(res, [], 'Incorrect email or password');
                    }
                }));
            }
            else {
                console.log(hasRequired.message);
                const message = hasRequired.message;
                return utils_1.default.helpers.sendErrorResponse(res, { message }, 'Missing required fields');
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.js.map