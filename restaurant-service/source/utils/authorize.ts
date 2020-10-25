import * as jwt from "jsonwebtoken";

export function authorize() {
    return (req, res, next) => {
        try {
            let token = req.headers['authorization'].split(' ')[1];
            jwt.verify(token, 'someSecret', (err, decoded) => {
                if (err) {
                    throw err;
                }
                next();
            });
        } catch (e) {
            throw e;
        }
    }
}