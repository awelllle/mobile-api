"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = exports.JobSchema = void 0;
const mongoose_1 = require("mongoose");
exports.JobSchema = new mongoose_1.Schema({
    title: String,
    company: String,
    companyImage: String,
    tags: Array,
    description: String,
    postedBy: String,
    created: Date,
});
exports.Job = (0, mongoose_1.model)('Job', exports.JobSchema);
//# sourceMappingURL=job.js.map