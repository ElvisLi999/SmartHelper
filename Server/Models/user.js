"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// create a blog user model that including all necessary fields
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema; // Schema alias
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true, // make sure username is unique
        trim: true // trim white space
    },
    email: {
        type: String,
        required: true,
        unique: true, // make sure email is unique
        trim: true
    },
    displayName: {
        type: String,
        required: false,
        trim: true // displayName is optional
    },
    role: {
        type: String,
        default: 'user', // default role is user
        enum: ['user', 'author', 'admin'] // role must be in the enum list
    },
    profilePicture: {
        type: String,
        required: false // profile picture is optional
    },
    bio: {
        type: String,
        required: false // bio is optional
    },
    createdAt: {
        type: Date,
        default: Date.now // create time, default is now
    },
    updatedAt: {
        type: Date,
        default: Date.now // update time, default is now
    }
}, {
    collection: 'users'
});
// Apply the passport-local-mongoose plugin to UserSchema
// By default, it uses 'username' as the login field
UserSchema.plugin(passport_local_mongoose_1.default);
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
console.log('User model registered');
//# sourceMappingURL=user.js.map