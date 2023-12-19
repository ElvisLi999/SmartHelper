// create a comment model that including all necessary fields for article comments
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // Schema alias

const CommentSchema = new Schema({
    articleId: [{    // articles array related to this tag
        type: Schema.Types.ObjectId,   // article id
        ref: 'Article', // reference to Article model
        required: true
    }],
    author: { // author name
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {  // comment's content
        type: String,
        required: true,
        trim: true 
    },
    createdAt: {    // create time
        type: Date,
        default: Date.now 
    },
    updatedAt: {    // update time
        type: Date,
        default: Date.now
    }

},
{
       collection: 'comments'
});

//  update the updatedAt field before saving the document
CommentSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Comment = mongoose.model('Tag', CommentSchema);
export default Comment;