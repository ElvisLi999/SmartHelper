// Category model including all necessary fields for article classification
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // Schema alias
interface ICategory extends Document {
    name: string;
    description: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string[];
    createdAt: Date;
    updatedAt: Date;
  }

const CategorySchema = new Schema({
    name: { // category name
        type: String,
        required: true,
        unique: true, // make sure category name is unique
        trim: true // remove white space on two ends
    },
    description: { // category description
        type: String,
        required: false,
        trim: true
    },
    seoTitle: { // optimized title for search engine
        type: String,
        required: false,
        trim: true 
    },
    seoDescription: {   // optimized description for search engine
        type: String,
        required: false,
        trim: true 
    },
    seoKeywords: [{ // optimized keywords for search engine
        type: String,
        required: false 
    }],
    createdAt: {
        type: Date,
        default: Date.now 
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},
{   collection: 'categories' 
});

//  update the updatedAt field before saving the document
CategorySchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Category = mongoose.model<ICategory>('Category', CategorySchema);
export default Category;

console.log('Category model registered');
