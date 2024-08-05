import express, { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/CustomError';
import { QuestionAnswerController } from '../controllers/QuestionAnswerController';

export const QuestionAnswerRouter = express.Router();

QuestionAnswerRouter.post('/quizzes/:quizId/attempts/:attemptId/questions/:questionId/answers',
    (req: Request, res: Response, next: NextFunction) => {
        QuestionAnswerController.save(req)
            .then((QuestionAnswer) => {
                res.json(QuestionAnswer);
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });