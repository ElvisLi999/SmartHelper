"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// create the website model that including all necessary fields for SEO and management
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema; // Schema alias
const SiteInfoSchema = new mongoose_1.default.Schema({
    siteTitle: {
        type: String,
        required: true, // title is required
        trim: true // remove white space
    },
    siteDescription: {
        type: String,
        required: false, // description is optional
        trim: true
    },
    siteLogo: {
        type: String,
        required: false // logo is optional
    },
    footerText: {
        type: String,
        required: false,
        trim: true
    },
    contactEmail: {
        type: String,
        required: false,
        trim: true
    },
    socialLinks: [{
            platform: String,
            url: String,
            required: false
        }],
    seoKeywords: {
        type: [String], // array of SEO keywords strings
        required: false
    },
    googleAnalyticsCode: {
        type: String,
        required: false
    },
    otherMetaTags: [{
            name: String,
            content: String,
            required: false
        }],
    createdAt: {
        type: Date,
        default: Date.now // default is now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'siteInfos'
});
// update the update time before saving the document
SiteInfoSchema.pre('save', function (next) {
    this.updatedAt = new Date;
    next();
});
const SiteInfo = mongoose_1.default.model('SiteInfo', SiteInfoSchema);
exports.default = SiteInfo;
//# sourceMappingURL=siteInfo.js.map