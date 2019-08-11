//global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//social
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

const NAVER = "/auth/naver";
const NAVER_CALLBACK = "/auth/naver/callback";

const KAKAO = "/auth/kakao";
const KAKAO_CALLBACK = "/auth/kakao/callback";

const FACEBOOK = "/auth/facebook";
const FACEBOOK_CALLBACK = "/auth/facebook/callback";

//Users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

//Videos
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEOS_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete"

const API = "/api";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";
const REMOVE_COMMENT = "/:id/removeComment";

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    github: GITHUB,
    githubCallback: GITHUB_CALLBACK,
    naver: NAVER,
    naverCallback: NAVER_CALLBACK,
    kakao: KAKAO,
    kakaoCallback: KAKAO_CALLBACK,
    facebook: FACEBOOK,
    facebookCallback: FACEBOOK_CALLBACK,
    users: USERS,
    userDetail: (id) => {
        if (id) {
            return `/users/${id}`;
        } else {
            return USER_DETAIL;
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    me: ME,
    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail: (id) => {
        if (id) {
            return `/videos/${id}`;
        } else {
            return VIDEOS_DETAIL;
        }
    },

    editVideo: (id) => {
        if (id) {
            return `/videos/${id}/edit`;
        } else {
            return EDIT_VIDEO;
        }
    },

    deleteVideo: (id) => {
        if (id) {
            return `/videos/${id}/delete`;
        } else {
            return DELETE_VIDEO;
        }
    },
    api: API,
    registerView: REGISTER_VIEW,
    addComment: ADD_COMMENT,
    removeComment : REMOVE_COMMENT
}

export default routes;