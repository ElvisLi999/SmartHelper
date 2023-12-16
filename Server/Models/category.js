"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Category model including all necessary fields for article classification
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema; // Schema alias
const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true, // make sure category name is unique
        trim: true // remove white space on two ends
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    seoTitle: {
        type: String,
        required: false,
        trim: true
    },
    seoDescription: {
        type: String,
        required: false,
        trim: true
    },
    seoKeywords: [{
            type: String,
            required: false
        }],
    articles: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Article', // reference to Article model
        }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
//  update the updatedAt field before saving the document
CategorySchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
const Model = mongoose_1.default.model('Category', CategorySchema);
exports.default = Model;
//# sourceMappingURL=category.js.map