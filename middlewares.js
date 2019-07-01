import routes from "./routes";

export const localMiddleWare = (req, res, next) => {
    res.locals.siteName = 'Webtube';
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated : true,
        id: 1
    };
    next();
};