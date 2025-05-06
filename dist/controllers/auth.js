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
                const token = utils_1.default.auth.generateToken('awelle');
                return res.status(200).json({ token, userId: '1234567890' });
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
            const hasRequired = utils_1.default.helpers.validParam(body, required);
            if (hasRequired.success) {
                const token = utils_1.default.auth.generateToken('awelle');
                return res.status(200).json({ token, userId: '1234567890' });
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