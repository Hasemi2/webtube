import routes from "./routes";

export const localMiddleWare = (req, res, next) => {
    res.locals.siteName = 'Webtube';
    res.locals.routes = routes;
    next();
};