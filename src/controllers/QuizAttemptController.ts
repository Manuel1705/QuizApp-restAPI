import { Request } from 'express';
import { CustomError } from '../utils/CustomError';
import { QuizAttempt } from '../models/Database';
import { QuizController } from '../controllers/QuizController';
import { QuizAttempt as QuizAttemptClass } from '../models/QuizAttempt';


interface QuizAttemptRequest extends Request {
    username?: string
}

export class QuizAttemptController {

    static async findById(req: Request): Promise<QuizAttemptClass> {
        const attempt = await QuizAttempt.findByPk(req.params.attemptId);
        if (!attempt)
            throw new CustomError(404, 'The attempt does not exist');
        return attempt;
    }

    static async getByQuiz(req: Request): Promise<QuizAttemptClass[]> {
        return QuizAttempt.findAll({
            where: {
                quizId: req.params.quizId
            }
        });
    }

    static async save(req: QuizAttemptRequest): Promise<QuizAttemptClass> {
        req.body.quizId = req.params.quizId;
        return QuizAttempt.create(req.body);
    }



    static async addError(req: Request): Promise<QuizAttemptClass> {
        const attempt = await this.findById(req);
        attempt.errors++;
        if (attempt.passed) {
            const quiz = await QuizController.findById(req);
            if (attempt.errors > quiz.maxErrors)
                attempt.passed = false;
        }
        return attempt.save();
    }


    static async delete(req: Request): Promise<void> {
        const attempt = await this.findById(req);
        return attempt.destroy();
    }

}