import mongoose, { Document, Schema } from 'mongoose';

export interface IAILink extends Document {
    name: string;
    description: string;
    url: string;
    imageUrl: string;
    category: string;
}

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
    },
    category: { // ai tool category
        type: String,
        required: true,
        trim: true
    }
},
{
    collection: 'aiLinks'
});

const AILink = mongoose.model<IAILink>('AILink', AILinkSchema);

export default AILink;
