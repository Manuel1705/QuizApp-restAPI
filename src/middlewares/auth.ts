import { Request, Response, NextFunction } from "express";
import { AuthController } from "../controllers/AuthController";
import { JwtPayload } from "jsonwebtoken";
import { QuizController } from "../controllers/QuizController";
import { QuizAttemptController } from "../controllers/QuizAttemptController";
import { CustomError } from "../utils/CustomError";


interface authVerificationRequest extends Request {
    username?: string;
}

export function enforceAuth(req: authVerificationRequest, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        next({ status: 401, message: "Unauthorized, no token provided" });
        return;
    }
    AuthController.isTokenValid(token,
        (err, decodedToken) => {
            if (err) {
                next({ status: 401, message: "Unauthorized, the token is not valid" });
                return;
            }
            req.username = (decodedToken as JwtPayload)?.username;
            next();
        }
    );
}

export function ensureUsersModifyOnlyOwnQuizzes(req: authVerificationRequest, res: Response, next: NextFunction) {
    const quizId = req.params.quizId;
    if (!quizId) {
        next({ status: 400, message: "Bad request, the quiz id is missing" });
        return;
    }
    QuizController.findById(req)
        .then((quiz) => {
            if (quiz.creator !== req.username) {
                next({ status: 403, message: "Forbidden, you can only modify your own quiz" });
                return;
            }
            next();
        })
        .catch((err: CustomError) => {
            next({ status: err.status, message: err.message });
        });
}

export function ensureQuizIsNotPublished(req: authVerificationRequest, res: Response, next: NextFunction) {
    const quizId = req.params.quizId;
    if (!quizId) {
        next({ status: 400, message: "Bad request, the quiz id is missing" });
        return;
    }
    QuizController.findById(req)
        .then((quiz) => {
            if (quiz.published) {
                next({ status: 403, message: "Forbidden, you cannot modify a published quiz" });
                return;
            }
            next();
        })
        .catch((err: CustomError) => {
            next({ status: err.status, message: err.message });
        });
}

export async function ensureAttemptIsNotEnded(req: Request, res: Response, next: NextFunction) {
    const attempt = await QuizAttemptController.findById(req);
    if (attempt.ended)
        next({ status: 403, message: "Forbidden! This attempt has already ended" });
    else
        next();
}





