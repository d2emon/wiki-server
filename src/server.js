import app from './app';

import { errorResponse } from './helpers/response';
import messages from './helpers/messages';

process.on('uncaughtException', (err) => {
    console.log('uncaughtException',err);
    process.exit(0);
});

process.on('UnhandledPromiseRejectionWarning', (err) => {
    console.log('UnhandledPromiseRejectionWarning',err);
    process.exit(0);
});

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', { p, reason: reason.stack });
});

const logErrors = (err, req, res, next) => {
    console.error(err.stack);
    return next(err);
}

const clientErrorHandler = (err, req, res, next) => {
    if (req.xhr) {
        return res
            .status(500)
            .send(errorResponse(messages.UNKNOWN_TECH_ERROR));
    } else {
        return next(err);
    }

}
const errorHandler = (err, req, res, next) => {
    return res
        .status(500)
        .send(errorResponse(messages.UNKNOWN_TECH_ERROR));
}

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// const debug = Debug(process.env.APP_NAME);

app.listen(
    process.env.WIKI_SERVER_PORT,
    () => {
        // debug(`${process.env.APP_NAME} listening on port ${process.env.WIKI_SERVER_PORT}!`);
        console.log(`${process.env.APP_NAME} listening on port ${process.env.WIKI_SERVER_PORT}!`);
    },
);
