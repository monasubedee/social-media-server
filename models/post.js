import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const postSchema = new Schema({
    _id:Schema.Types.ObjectId,
    userId: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    description:String,
    likes:{
        type:Array,
        default:[]
    },
    image:String
},
{
    timestamps:true
});

const Post = mongoose.model('Post',postSchema);

export default Post;