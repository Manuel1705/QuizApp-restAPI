import express, { Request, Response, NextFunction, response } from "express";
import { CustomError } from "../utils/CustomError";
import { QuizAttemptController } from "../controllers/QuizAttemptController";
import { enforceAuth, ensureUsersModifyOnlyOwnQuizzes, ensureAttemptIsNotEnded } from "../middlewares/auth";

export const quizAttemptRouter = express.Router();

quizAttemptRouter.post("/quizzes/:quizId/attempts",
    (req: Request, res: Response, next: NextFunction) => {
        QuizAttemptController.save(req)
            .then((attempt) => {
                res.json(attempt);
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });

quizAttemptRouter.get("/quizzes/:quizId/attempts",
    enforceAuth,
    (req: Request, res: Response, next: NextFunction) => {
        QuizAttemptController.getByQuiz(req)
            .then((attempts) => {
                res.json(attempts);
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });

quizAttemptRouter.get("/quizzes/:quizId/attempts/:attemptId",
    enforceAuth,
    (req: Request, res: Response, next: NextFunction) => {
        QuizAttemptController.findById(req)
            .then((attempts) => {
                res.json(attempts);
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });

quizAttemptRouter.put("/quizzes/:quizId/attempts/:attemptId/end",
    ensureAttemptIsNotEnded,
    (req, res, next) => {
        QuizAttemptController.end(req)
            .then(() => {
                res.json({ response: "Attempt ended" });
            }).catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            })
    });

quizAttemptRouter.delete("/quizzes/:quizId/attempts/:attemptId",
    enforceAuth,
    ensureUsersModifyOnlyOwnQuizzes,
    (req: Request, res: Response, next: NextFunction) => {
        QuizAttemptController.delete(req)
            .then(() => {
                res.json({ response: "Attempt deleted" });
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });
