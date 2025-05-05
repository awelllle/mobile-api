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
exports.authenticate = void 0;
const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header('Authorization').split(' ')[1];
        //Token shouldn't be empty, but just incase it is
        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) {
                return res.status(401).json('Token is either Invalid or has expired');
            }
            else {
                // console.log(decoded, 'Token decoded');
                req.user = decoded;
                return next();
            }
        });
    }
    catch (error) {
        return res.status(401).json('No Authorisation header');
    }
});
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map