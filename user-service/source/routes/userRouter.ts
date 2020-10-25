import * as jwt from "jsonwebtoken";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { User } from "../controllers/user";

export class UserRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.router
            .post("/signup", this.createUser)
            .post("/signin", this.signIn);
    }
    public async createUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            let userItem = new User();
            let newUser = await userItem.create(req.body);
            if (newUser) {
                const token = jwt.sign({userId: newUser._id}, 'someSecret', {expiresIn: 86400});
                return res.status(201).json({
                    token,
                    success: true
                });
            }
            res.status(400).json({
                success: false
            });
        } catch (e) {
            next(e);
        }
    }

    public async signIn(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            //TODO
        } catch (e) {
            next(e);
        }
    }
}