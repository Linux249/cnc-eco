// protect routes with user authentication

const next = res => err => res.error(err);

export const middleware = (handler, options = {}) => (req, res) => {

    if(options.db) {

    }

    if(options.auth) {

    }

    if(options.cors) {

    }

    return handler(req, res, next(res));
};

export default middleware;
