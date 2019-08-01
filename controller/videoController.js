import Video from "../models/Video";
import routes from "../routes";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({_id : -1});
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
        videos = await Video.find({title:{$regex: searchingBy, $options:"i"}}); //insentive 대소문자 구분 x
    } catch (error) {
        console.log(error);
    }
  
    res.render("search", { pageTitle: "Search", searchingBy, videos });
}

export const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload" });
export const postUpload = async (req, res) => {
    const {
        body: { file, title, description },
        file: { path }
    } = req;
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description,
    });
    res.redirect(routes.home);
    //res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
    //console.log("req.params " , req.params);
    const {
        params: {id}
    } = req;
    try {
        const video = await Video.findById(id); 
        res.render("videoDetail", { pageTitle: video.title , video });   
    } catch (error) {
        console.log("error" ,error);
        res.redirect(routes.home);
    }
    


}
export const getEditVideo =  async (req, res) => {
    const {
        params : {id}
    } = req;
   try {
       const video = await Video.findById(id);
       console.log("video===============================> " , video.id);
       console.log("video===============================> " , video._id);
       res.render("editVideo", { pageTitle: `${video.title}`, video });   
   } catch (error) {
       console.log(error);
       res.redirect(routes.home);
   } 
    res.render("editVideo", { pageTitle: "editVideo" });
}

export const postEditVideo = async (req, res) => {
    const {
        params : {id},
        body : {title, description}
    } = req;
    
    try {
        await Video.findByIdAndUpdate({_id : id}, {title, description});
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
  
}

export const deleteVideo = async (req, res) => {
    const {
        params : {id}
    } = req;

    try {
        await Video.findByIdAndDelete({_id : id});
        res.redirect(routes.home);

    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
    //res.render("deleteVideo", { pageTitle: "deleteVideo" });
}