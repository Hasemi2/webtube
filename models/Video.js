import mongoose from "mongoose";

const VideosSchema = new mongoose.Schema({
    fileUrl:{
        type:String,
        required:"File URL is Required"
    }, 
    title : {
        type:String,
        required:"title is Required"
    },
    description : String,
    vies : {
        type :Number,
        default : 0
    },
    createdAt : {
        type:Date,
        default:Date.now
    },
    comments : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

const model = mongoose.model("Video", VideosSchema); //모델생성 
export default model;