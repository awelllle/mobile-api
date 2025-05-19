"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jobseeker = exports.JobseekerSchema = void 0;
const mongoose_1 = require("mongoose");
const bcrypt = require("bcryptjs");
exports.JobseekerSchema = new mongoose_1.Schema({
    email: String,
    name: String,
    bio: String,
    profileImage: {
        type: Object,
        default: {
            uri: '',
            type: '',
            name: ''
        }
    },
    location: {
        type: Object,
        default: {
            country: '',
            city: ''
        }
    },
    skills: (Array),
    portfolio: (Array),
    password: String,
    userId: String,
});
exports.JobseekerSchema.pre("save", function save(next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
const comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};
exports.JobseekerSchema.methods.comparePassword = comparePassword;
exports.Jobseeker = (0, mongoose_1.model)('Jobseeker', exports.JobseekerSchema);
//# sourceMappingURL=jobseeker.js.map