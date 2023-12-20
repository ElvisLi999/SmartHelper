"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// create a blog article model that including all necessary fields
const mongoose_1 = __importStar(require("mongoose"));
const ArticleSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    tags: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Tag',
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'articles'
});
//  update the updatedAt field before saving the document
ArticleSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
const Article = mongoose_1.default.model('Article', ArticleSchema);
exports.default = Article;
//# sourceMappingURL=article.js.map