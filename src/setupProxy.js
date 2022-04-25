// @ts-ignore: isolated modules error
const createProxyMiddleware = require("http-proxy-middleware");
//import { env } from "process"

const target = "https://localhost:7217";

const context = [
    "/monsters",
]

module.exports = function (app/*: { use: (arg0: any) => void; }*/) {
    const appProxy = createProxyMiddleware.createProxyMiddleware(context, {
        target: target,
        secure: false,
        headers: {
            Connection: "Keep-Alive",
        }
    });

    app.use(appProxy);
};
