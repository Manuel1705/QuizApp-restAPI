import express, { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/CustomError';
import { OpenQuestionController } from '../controllers/OpenQuestionController';
import { enforceAuth, ensureUsersModifyOnlyOwnQuizzes, ensureQuizIsNotPublished } from '../middlewares/auth';

export const openQuestionRouter = express.Router();

openQuestionRouter.post('/quizzes/:quizId/openQuestions',
    enforceAuth,
    ensureUsersModifyOnlyOwnQuizzes,
    ensureQuizIsNotPublished,
    (req: Request, res: Response, next: NextFunction) => {
        OpenQuestionController.save(req)
            .then((openQuestion) => {
                res.json(openQuestion);
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });

openQuestionRouter.get('/quizzes/:quizId/openQuestions',
    (req: Request, res: Response, next: NextFunction) => {
        OpenQuestionController.getByQuiz(req)
            .then((openQuestions) => {
                res.json(openQuestions);
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });

openQuestionRouter.get('/quizzes/:quizId/openQuestions/:questionId',
    (req: Request, res: Response, next: NextFunction) => {
        OpenQuestionController.findById(req)
            .then((openQuestion) => {
                res.json(openQuestion);
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });

openQuestionRouter.put('/quizzes/:quizId/openQuestions/:questionId',
    enforceAuth,
    ensureUsersModifyOnlyOwnQuizzes,
    ensureQuizIsNotPublished,
    (req: Request, res: Response, next: NextFunction) => {
        OpenQuestionController.update(req)
            .then((openQuestion) => {
                res.json({ response: 'Open question updated', openQuestion });
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });

openQuestionRouter.delete('/quizzes/:quizId/openQuestions/:questionId',
    enforceAuth,
    ensureUsersModifyOnlyOwnQuizzes,
    ensureQuizIsNotPublished,
    (req: Request, res: Response, next: NextFunction) => {
        OpenQuestionController.delete(req)
            .then(() => {
                res.json({ response: 'Open question deleted' });
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });
