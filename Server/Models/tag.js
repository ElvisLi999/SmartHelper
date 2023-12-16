"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// create a Tag model that including all necessary fields for article classification
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema; // Schema alias
const TagSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true, // make sure tag name is unique
        trim: true // remove white space on two ends
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    articles: [{
            type: mongoose_1.default.Schema.Types.ObjectId, // article id
            ref: 'Article' // reference to Article model
        }]
});
//  update the updatedAt field before saving the document
TagSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
const Model = mongoose_1.default.model('Tag', TagSchema);
exports.default = Model;
//# sourceMappingURL=tag.js.map