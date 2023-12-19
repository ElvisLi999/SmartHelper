// create a Tag model that including all necessary fields for article classification
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // Schema alias

const TagSchema = new Schema({
    name: { // tag name
        type: String,
        required: true,
        unique: true, // make sure tag name is unique
        trim: true // remove white space on two ends
    },
    description: {  // tag description
        type: String,
        required: false,
        trim: true 
    },
    createdAt: {    // create time
        type: Date,
        default: Date.now 
    },
    updatedAt: {    // update time
        type: Date,
        default: Date.now
    },
},
{
       collection: 'tags'
});

//  update the updatedAt field before saving the document
TagSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Tag = mongoose.model('Tag', TagSchema);
export default Tag;