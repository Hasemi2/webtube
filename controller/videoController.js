import Video from "../models/Video";
import Comment from "../models/Comment";
import routes from "../routes";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ _id: -1 });
        res.render("home", { pageTitle: "Home", videos });
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: [] });
    }
}
export const search = async (req, res) => {
    //const searchingBy =  req.query.term;
    const {
        query: { term: searchingBy }
    } = req;
    let videos = [];
    try {
        videos = await Video.find({ title: { $regex: searchingBy, $options: "i" } }); //i ==> i   nsentive 대소문자 구분 x
    } catch (error) {
        console.log(error);
    }

    res.render("search", { pageTitle: "Search", searchingBy, videos });
}

export const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload" });
export const postUpload = async (req, res) => {
    let thumbPath;
    const {
        body: { title, description },
        files: {
            videoFile: [{ location: videoPath }], //기존 static filed은 path로, AWS S3 사용시 location에 url 저장됨
            //thumbnail: [{ location: thumbPath }] 
            //todo 여기서 선택적으로  thumnail을 보내거나 안보낼수도 있는데 이때 여기서 null처리를 어케함??
        }
    } = req;
    
    if(req.thumbnail){
        thumbPath = req.thumbnail.location; 
    } else{
        thumbPath = "";
    }

    const newVideo = await Video.create({
        fileUrl: videoPath,
        thumbnail: thumbPath,
        title,
        description,
        creator: req.user.id
    });

    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));

};

export const videoDetail = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id).populate("creator").populate("comments");
        //populate() : Schema에서 참조하는 ref 객체로 치환해줌, 여기서는 User객체
        res.render("videoDetail", { pageTitle: video.title, video });

    } catch (error) {
        console.log("error", error);
        res.redirect(routes.home);
    }



}
export const getEditVideo = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);

        if (video.creator != req.user.id) {
            throw Error(); //try 안에서 에러 발생시 catch절로 가게됨
        } else {
            res.render("editVideo", { pageTitle: video.title, video });
        }

    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }   
}

export const postEditVideo = async (req, res) => {
    const {
        params: { id },
        body: { title, description }
    } = req;

    try {
        await Video.findByIdAndUpdate({ _id: id }, { title, description });
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }

}

export const deleteVideo = async (req, res) => {
    const {
        params: { id }
    } = req;

    try {
        const video = await Video.findById(id);
        if (video.creator !== req.user.id) {
            throw Error(); //try 안에서 에러 발생시 catch절로 가게됨
        } else {
            await Video.findByIdAndDelete({ _id: id });
            res.redirect(routes.home);
        }


    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
    //res.render("deleteVideo", { pageTitle: "deleteVideo" });

}

//조회수 추가
export const postRegisterView = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        video.views += 1;
        video.save();
        res.status(200);
    } catch (error) {
        res.status(400);
        console.log(error);
    } finally {
        res.end();
    }

}

export const postAddComment = async (req, res) => {
    const {
        params: { id },
        body: { comment },
        user
    } = req;

    console.log("req" , req.body);
    
    try {
        const video = await Video.findById(id);
        const newComment = await Comment.create({
            text: comment,
            video: id,
            creator: user.id
        });

        video.comments.push(newComment._id);
        video.save();
        res.status(200);
    } catch (error) {
        res.status(400);
        console.log(error);
    } finally {
        res.end();
    }
}

export const postRemoveComment = async(req, res) => {
    const {
        params : {id}
    } = req;
    try {
        await Comment.findByIdAndRemove(id);
        res.status(200);
    } catch (error) {
        res.status(400);
        console.log(error);
    } finally {
        res.end();
    }
}

//todo : 화면단과 연결하여 테스트 필요
//axios로 비동기 호출시 페이지 새로 고침을 해야될거같음
export const postUpdateComment = async(req, res) => {
    const {
        params: {id},
        body : {comment}
    } = req;

    try {
        await Comment.findByIdAndUpdate(id, comment, {new : true})
        res.status(200);

    } catch (error) {
        res.status(400);
        console.log(error);
    }

}