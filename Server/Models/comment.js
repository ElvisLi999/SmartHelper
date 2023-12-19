"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// create a comment model that including all necessary fields for article comments
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema; // Schema alias
const CommentSchema = new Schema({
    articleId: [{
            type: Schema.Types.ObjectId, // article id
            ref: 'Article', // reference to Article model
            required: true
        }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
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
    collection: 'comments'
});
//  update the updatedAt field before saving the document
CommentSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
const Comment = mongoose_1.default.model('Tag', CommentSchema);
exports.default = Comment;
//# sourceMappingURL=comment.js.map