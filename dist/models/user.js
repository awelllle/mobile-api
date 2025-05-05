"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    email: String,
    name: String,
    username: String,
    userId: String,
    status: { type: String, default: 'unpaid' },
});
exports.User = (0, mongoose_1.model)('User', exports.UserSchema);
//# sourceMappingURL=user.js.map