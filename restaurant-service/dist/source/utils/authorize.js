"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const jwt = require("jsonwebtoken");
function authorize() {
    return (req, res, next) => {
        try {
            let token = req.headers['authorization'].split(' ')[1];
            jwt.verify(token, 'someSecret', (err, decoded) => {
                if (err) {
                    throw err;
                }
                next();
            });
        }
        catch (e) {
            throw e;
        }
    };
}
exports.authorize = authorize;
