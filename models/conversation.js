import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const conversationSchema = new Schema({
    _id:Schema.Types.ObjectId,
     members:{
         type:Array,
         default:[]
     }
},
{
    timestamps:true
});

const Conversation = mongoose.model('Conversation',conversationSchema);

export default Conversation;