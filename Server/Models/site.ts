// create the website model that including all necessary fields for SEO and management
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // Schema alias

const SiteSchema = new mongoose.Schema({
    siteTitle: {    // website title
        type: String,
        required: true, // title is required
        trim: true // remove white space
    },
    siteDescription: {  // website description
        type: String,
        required: false, // description is optional
        trim: true 
    },
    siteLogo: { // website logo's URL
        type: String,
        required: false // logo is optional
    },
    footerText: {   // website footer text, such as copy right info
        type: String,
        required: false,
        trim: true 
    },
    contactEmail: { // contact email
        type: String,
        required: false, 
        trim: true 
    },
    socialLinks: [{ // social links
        platform: String,
        url: String,
        required: false
    }],
    seoKeywords: {  // SEO keywords
        type: [String], // array of SEO keywords strings
        required: false
    },
    googleAnalyticsCode: {  // Google Analytics tracking code
        type: String,
        required: false 
    },
    otherMetaTags: [{ // other meta tags
        name: String,
        content: String,
        required: false
    }],
    createdAt: {    // create time
        type: Date,
        default: Date.now // default is now
    },
    updatedAt: {    // update time
        type: Date,
        default: Date.now 
    }
});

// update the update time before saving the document
SiteSchema.pre('save', function (next) {
    this.updatedAt = new Date;
    next();
});

const Model = mongoose.model('Site', SiteSchema);
export default Model;
