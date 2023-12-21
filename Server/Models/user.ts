// create a blog user model that including all necessary fields
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // Schema alias
import passportLocalMongoose from 'passport-local-mongoose';

//  define User interface, including custom fields and fields provided by passport-local-mongoose
interface IUser extends mongoose.Document {
    username: string;
    email: string;
    displayName: string;
    role: string;
    profilePicture: string;
    bio: string;
    createdAt: Date;
    updatedAt: Date;
    // could add other fields or methods provided by passport-local-mongoose
}

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
},{
    collection:'users'
});

// Declare the global type for UserDocument to use with passport-local-mongoose plugin
declare global
{
    export type UserDocument = mongoose.Document &
    {
        _id: String,
        username: String,
        email: String,
        displayName: String,
        role: String,
        profilePicture: String,
        bio: String,
        createdAt: Date,
        updatedAt: Date
    }
}

// Apply the passport-local-mongoose plugin to UserSchema
// By default, it uses 'username' as the login field
UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model<IUser>('User', UserSchema);
export default User;

console.log('User model registered');

