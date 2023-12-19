// create a blog article model that including all necessary fields
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // Schema alias

const ArticleSchema = new Schema({
    title: {   // article title
        type: String,
        required: true,
        trim: true
    },
    author: {   // article author
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {  // article content
        type: String,
        required: true
    },
    summary: {  // article summary
        type: String,
        required: false,
        trim: true
    },
    category: { // article category
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    tags: [{    // article tags
        type: Schema.Types.ObjectId,
        ref: 'Tag',
        required: false
    }],
    coverImage: {   // article cover image
        type: String,
        required: false // cover image is optional     
    },
    seoTitle: { // SEO title   
        type: String,
        required: false,
        trim: true 
    },
    seoKeywords: [{ // SEO keywords, can be an array of strings
        type: String,
        required: false 
    }],
    published: {    // article published or not
        type: Boolean,
        default: false
    },
    publishedAt: {  // article published date
        type: Date,
        default: null
    },
    permissions: {  // article permissions
        read: {
            type: [String],
            default: ['public']
        },
        edit: {     // who can edit this article
            type: [String],
            default: []
        }
    },
    likes: {    // article likes
        type: Number,
        default: 0
    },
    views: {    // article views
        type: Number,
        default: 0
    },
    createdAt: {    // article created date
        type: Date,
        default: Date.now
    },
    updatedAt: {    // article updated date
        type: Date,
        default: Date.now
    }
},
{
    collection: 'articles'
});

//  update the updatedAt field before saving the document
ArticleSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Article = mongoose.model('Article', ArticleSchema);
export default Article;
