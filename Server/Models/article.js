"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// create a blog article model that including all necessary fields
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema; // Schema alias
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: false,
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    tags: [{
            type: String,
            required: false
        }],
    coverImage: {
        type: String,
        required: false // cover image is optional     
    },
    seoTitle: {
        type: String,
        required: false,
        trim: true
    },
    seoKeywords: [{
            type: String,
            required: false
        }],
    published: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date,
        default: null
    },
    permissions: {
        read: {
            type: [String],
            default: ['public']
        },
        edit: {
            type: [String],
            default: []
        }
    },
    likes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    comments: [{
            author: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'User'
            },
            comment: String,
            date: {
                type: Date,
                default: Date.now
            }
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
ArticleSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
const Model = mongoose_1.default.model('Article', ArticleSchema);
exports.default = Model;
//# sourceMappingURL=article.js.map