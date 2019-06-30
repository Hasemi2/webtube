export const home = (req, res) => res.render("home", { pageTitle: "Home" }); //home.pug를 찾아감 1. 템플릿 2. 템플릿에 추가할 정보가 담긴 객체
export const search = (req, res) => {
    //const searchingBy =  req.query.term;
    const {
        query : {term : searchingBy}
    } = req;
    res.render("search", { pageTitle: "Search" , searchingBy });
}

export const videos = (req, res) => res.send("videos", { pageTitle: "Video" });
export const upload = (req, res) => res.send("upload", { pageTitle: "Upload" });
export const videoDetail = (req, res) => res.send("videoDetail", { VideoDetail });
export const editVideo = (req, res) => res.send("editVideo", { EditVideo });
export const deleteVideo = (req, res) => res.send("deleteVideo", { DeleteVideo });