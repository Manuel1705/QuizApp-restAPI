import express, { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/CustomError';
import { MultipleChoiceQuestionController } from '../controllers/MultipleChoiceQuestionController';
import { enforceAuth, ensureUsersModifyOnlyOwnQuizzes, ensureQuizIsNotPublished } from '../middlewares/auth';

export const multipleChoiceQuestionRouter = express.Router();

multipleChoiceQuestionRouter.post('/quizzes/:quizId/multipleChoiceQuestions',
    enforceAuth,
    ensureUsersModifyOnlyOwnQuizzes,
    ensureQuizIsNotPublished,
    (req: Request, res: Response, next: NextFunction) => {
        MultipleChoiceQuestionController.save(req)
            .then((multipleChoiceQuestion) => {
                res.json(multipleChoiceQuestion);
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });

multipleChoiceQuestionRouter.get('/quizzes/:quizId/multipleChoiceQuestions',
    (req: Request, res: Response, next: NextFunction) => {
        MultipleChoiceQuestionController.getByQuiz(req)
            .then((multipleChoiceQuestions) => {
                res.json(multipleChoiceQuestions);
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });

multipleChoiceQuestionRouter.get('/quizzes/:quizId/multipleChoiceQuestions/:questionId',
    (req: Request, res: Response, next: NextFunction) => {
        MultipleChoiceQuestionController.findById(req)
            .then((multipleChoiceQuestion) => {
                res.json(multipleChoiceQuestion);
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });

multipleChoiceQuestionRouter.put('/quizzes/:quizId/multipleChoiceQuestions/:questionId',
    enforceAuth,
    ensureUsersModifyOnlyOwnQuizzes,
    ensureQuizIsNotPublished,
    (req: Request, res: Response, next: NextFunction) => {
        MultipleChoiceQuestionController.update(req)
            .then((multipleChoiceQuestion) => {
                res.json({ response: 'Multiple choice question updated', multipleChoiceQuestion });
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });

multipleChoiceQuestionRouter.delete('/quizzes/:quizId/multipleChoiceQuestions/:questionId',
    enforceAuth,
    ensureUsersModifyOnlyOwnQuizzes,
    ensureQuizIsNotPublished,
    (req: Request, res: Response, next: NextFunction) => {
        MultipleChoiceQuestionController.delete(req)
            .then(() => {
                res.json({ response: 'Multiple choice question deleted' });
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });