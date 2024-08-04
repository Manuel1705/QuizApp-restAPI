import express, { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/CustomError';
import { MultipleChoiceQuestionAnswerController } from '../controllers/MultipleChoiceQuestionAnswerController';

export const multipleChoiceQuestionAnswerRouter = express.Router();

multipleChoiceQuestionAnswerRouter.post('/quizzes/:quizId/attempts/:attemptId/multipleChoiceQuestions/:questionId/answers',
    (req: Request, res: Response, next: NextFunction) => {
        MultipleChoiceQuestionAnswerController.save(req)
            .then((multipleChoiceQuestionAnswer) => {
                res.json(multipleChoiceQuestionAnswer);
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });