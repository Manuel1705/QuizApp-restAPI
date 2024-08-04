import { Request } from 'express';
import { CustomError } from '../utils/CustomError';
import { Quiz } from '../models/Database';
import { Quiz as QuizClass } from '../models/Quiz';

interface QuizRequest extends Request {
    username?: string
}

export class QuizController {

    static async findById(req: Request): Promise<QuizClass> {
        const quiz = await Quiz.findByPk(req.params.quizId);
        if (!quiz)
            throw new CustomError(404, 'The quiz does not exist');
        return quiz;
    }

    static async getByCreator(req: QuizRequest): Promise<QuizClass[]> {
        return Quiz.findAll({
            where: {
                creator: req.username
            }
        });
    }

    static async save(req: QuizRequest): Promise<QuizClass> {
        req.body.creator = req.username;
        console.log(req.body);
        return Quiz.create(req.body) as Promise<QuizClass>;
    }

    static async update(req: Request): Promise<QuizClass> {
        const quiz = await this.findById(req)
        quiz.set(req.body);
        return quiz.save();
    }

    static async publish(req: Request): Promise<QuizClass> {
        const quiz = await this.findById(req)
        if (quiz.published)
            throw new CustomError(403, 'The quiz has already been published');
        quiz.published = true;
        return quiz.save();
    }

    static async delete(req: Request): Promise<void> {
        const quiz = await this.findById(req);
        return quiz.destroy();
    }
}
