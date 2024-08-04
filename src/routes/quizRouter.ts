import express, { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/CustomError";
import { QuizController } from "../controllers/QuizController";
import { enforceAuth, ensureQuizIsNotPublished, ensureUsersModifyOnlyOwnQuizzes } from "../middlewares/auth";

interface saveQuizRequest extends Request {
    username?: string
}

export const quizRouter = express.Router();

quizRouter.post("/quizzes",
    enforceAuth,
    (req: saveQuizRequest, res: Response, next: NextFunction) => {
        QuizController.save(req)
            .then((quiz) => {
                res.json(quiz);
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });

quizRouter.get("/quizzes",
    enforceAuth,
    (req: Request, res: Response, next: NextFunction) => {
        QuizController.getByCreator(req)
            .then((quizzes) => {
                res.json(quizzes);
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });

quizRouter.get("/quizzes/:quizId",
    (req: Request, res: Response, next: NextFunction) => {
        QuizController.findById(req)
            .then((quiz) => {
                res.json(quiz);
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });

quizRouter.put("/quizzes/:quizId",
    enforceAuth,
    ensureUsersModifyOnlyOwnQuizzes,
    ensureQuizIsNotPublished,
    (req: Request, res: Response, next: NextFunction) => {
        QuizController.update(req)
            .then((quiz) => {
                res.json({ response: "Quiz updated", quiz });
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });

quizRouter.put("/quizzes/:quizId/publish",
    enforceAuth,
    ensureUsersModifyOnlyOwnQuizzes,
    (req: Request, res: Response, next: NextFunction) => {
        QuizController.publish(req)
            .then((quiz) => {
                res.json({ response: "Quiz published", quiz });
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });

quizRouter.delete("/quizzes/:quizId",
    enforceAuth,
    ensureUsersModifyOnlyOwnQuizzes,
    (req: Request, res: Response, next: NextFunction) => {
        QuizController.delete(req)
            .then(() => {
                res.json({ response: "Quiz deleted" });
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });
