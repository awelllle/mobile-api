"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jobseeker = exports.JobseekerSchema = void 0;
const mongoose_1 = require("mongoose");
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
exports.Jobseeker = (0, mongoose_1.model)('Jobseeker', exports.JobseekerSchema);
//# sourceMappingURL=jobseeker.js.map