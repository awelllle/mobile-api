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
const user_1 = require("../models/user");
class AuthController {
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const required = [
                { name: 'name', type: 'string' },
                { name: 'username', type: 'string' },
                { name: 'email', type: 'string' },
            ];
            const { body } = req;
            const hasRequired = utils_1.default.helpers.validParam(body, required);
            if (hasRequired.success) {
                let email = body.email.toLowerCase();
                user_1.User.findOne({ email }, (err, user) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log(err, 'user signup error');
                        return utils_1.default.helpers.sendErrorResponse(res, {}, 'Something went wrong, please try again');
                    }
                    if (user == null) {
                        const id = (0, crypto_1.randomBytes)(60).toString('hex');
                        user = new user_1.User({
                            email: email,
                            userId: id,
                            name: body.name,
                            username: body.username,
                        });
                        yield user.save();
                        const token = utils_1.default.auth.generateToken(user.email);
                        return res.status(200).json({ token: token });
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
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.js.map