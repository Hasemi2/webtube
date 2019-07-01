import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text : {
        type:String,
        required : "Text is required"
    },
    createdAt : {
        type:Date,
        default:Date.now
    },
    video : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }
});

const model = mongoose.model("Comment", CommentSchema); //모델생성 
export default model;