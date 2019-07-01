import {videos} from "../db";
import routes from "../routes";

export const home = (req, res) => res.render("home", { pageTitle: "Home"  , videos}); //home.pug를 찾아감 1. 템플릿 2. 템플릿에 추가할 정보가 담긴 객체
export const search = (req, res) => {
    //const searchingBy =  req.query.term;
    const {
        query : {term : searchingBy}
    } = req;
    res.render("search", { pageTitle: "Search" , searchingBy, videos });
}

export const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload" });
export const postUpload = (req, res) =>  {
    const {
        body : {file, title, description} 
    } = req;
    //To do : Upload and savew Video
    res.redirect(routes.videoDetail(123));
};

export const videoDetail = (req, res) => res.render("videoDetail",  { pageTitle: "videoDetail" });
export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "editVideo" });
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "deleteVideo" });