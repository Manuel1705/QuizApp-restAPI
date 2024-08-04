import express, { Request, Response, NextFunction } from "express";
import { AuthController } from "../controllers/AuthController";
import { CustomError } from "../utils/CustomError";

export const authRouter = express.Router();

authRouter.post("/login",
    (req: Request, res: Response, next: NextFunction) => {
        AuthController.checkCredentials(req)
            .then(() => {
                AuthController.issueToken(req)
                    .then((token) => {
                        res.json(token);
                    })
                    .catch((err: CustomError) => {
                        next({ status: err.status, message: err.message });
                    });
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });

authRouter.post("/signup",
    (req: Request, res: Response, next: NextFunction) => {
        AuthController.save(req)
            .then((user) => {
                res.json(user);
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            })
    });