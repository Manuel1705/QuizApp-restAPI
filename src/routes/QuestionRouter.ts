import express, { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/CustomError';
import { QuestionController } from '../controllers/QuestionController';
import { enforceAuth, ensureUsersModifyOnlyOwnQuizzes, ensureQuizIsNotPublished } from '../middlewares/auth';

export const QuestionRouter = express.Router();

QuestionRouter.post('/quizzes/:quizId/questions',
    enforceAuth,
    ensureUsersModifyOnlyOwnQuizzes,
    ensureQuizIsNotPublished,
    (req: Request, res: Response, next: NextFunction) => {
        QuestionController.save(req)
            .then((Question) => {
                res.json(Question);
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });

QuestionRouter.get('/quizzes/:quizId/questions',
    (req: Request, res: Response, next: NextFunction) => {
        QuestionController.getByQuiz(req)
            .then((Questions) => {
                res.json(Questions);
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });

QuestionRouter.get('/quizzes/:quizId/questions/:questionId',
    (req: Request, res: Response, next: NextFunction) => {
        QuestionController.findById(req)
            .then((Question) => {
                res.json(Question);
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });

QuestionRouter.put('/quizzes/:quizId/questions/:questionId',
    enforceAuth,
    ensureUsersModifyOnlyOwnQuizzes,
    ensureQuizIsNotPublished,
    (req: Request, res: Response, next: NextFunction) => {
        QuestionController.update(req)
            .then((Question) => {
                res.json({ response: 'Question updated', Question });
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });

QuestionRouter.delete('/quizzes/:quizId/questions/:questionId',
    enforceAuth,
    ensureUsersModifyOnlyOwnQuizzes,
    ensureQuizIsNotPublished,
    (req: Request, res: Response, next: NextFunction) => {
        QuestionController.delete(req)
            .then(() => {
                res.json({ response: 'Question deleted' });
            })
            .catch((err: CustomError) => {
                next({ status: err.status, message: err.message });
            });
    });