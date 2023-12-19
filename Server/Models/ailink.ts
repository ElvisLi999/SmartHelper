import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AILinkSchema = new Schema({
    name: { // ai tool name
        type: String,
        required: true, 
        trim: true
    },
    description: {  // ai tool description
        type: String,
        required: true,
        trim: true
    },
    url: {  // ai tool url
        type: String,
        required: true,
        trim: true
    },
    imageUrl: { // ai tool image url
        type: String,
        required: false, 
        trim: true
    }
},
{
    collection: 'aiLinks'
});

const AILink = mongoose.model('AILink', AILinkSchema);

export default AILink;
