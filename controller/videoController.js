import Video from "../models/Video";
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
    console.log(req.files);
    const {
        body: { title, description },
        files: {
            videoFile: [{ path: videoPath }],
            thumbnail: [{ path: thumbPath }]
        }
    } = req;

    const newVideo = await Video.create({
        fileUrl: videoPath,
        thumbnail: thumbPath,
        title,
        description,
        creator: req.user.id
    });

    req.user.videos.push(newVideo.creator);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id).populate("creator");
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
        if (video.creator !== req.user.id) {
            throw Error(); //try 안에서 에러 발생시 catch절로 가게됨
        } else {
            res.render("editVideo", { pageTitle: `${video.title}`, video });
        }

    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
    res.render("editVideo", { pageTitle: "editVideo" });
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