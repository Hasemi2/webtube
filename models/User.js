import mongoose from "mongoose";
import passportLocalMongoose  from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    avataUrl : String,
    facebookId: Number,
    githubId : Number
});

//플러그인 설정
UserSchema.plugin(passportLocalMongoose, {usernameField : "email"});

const model = mongoose.model("User" , UserSchema);

export default model;


