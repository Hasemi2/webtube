import mongoose from "mongoose";
import passportLocalMongoose  from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    avatarUrl : String,
    facebookId: Number,
    githubId : Number,
    naverId : Number,
    kakaoId : Number,
    comments : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    videos : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ]
});

//플러그인 설정
UserSchema.plugin(passportLocalMongoose, 
{
    usernameField: "email"

});

const model = mongoose.model("User" , UserSchema);

export default model;


