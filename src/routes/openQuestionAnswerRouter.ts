import express, { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/CustomError';
import { OpenQuestionAnswerController } from '../controllers/OpenQuestionAnswerController';


export const openQuestionAnswerRouter = express.Router();

openQuestionAnswerRouter.post('/quizzes/:quizId/attempts/:attemptId/openQuestions/:questionId/answers',
    (req: Request, res: Response, next: NextFunction) => {
        OpenQuestionAnswerController.save(req)
            .then((openQuestionAnswer) => {
                res.json(openQuestionAnswer);
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });