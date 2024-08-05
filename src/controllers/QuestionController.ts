import { Request } from "express";
import { CustomError } from "../utils/CustomError";
import { Question } from "../models/Database";
import { Question as QuestionClass } from "../models/Question";

export class QuestionController {

    static async findById(req: Request): Promise<QuestionClass> {
        const question = await Question.findByPk(req.params.questionId);
        if (!question)
            throw new CustomError(404, 'The question does not exist');
        return question;
    }

    static async getByQuiz(req: Request): Promise<QuestionClass[]> {
        return Question.findAll({
            where: {
                quizId: req.params.quizId
            }
        });
    }

    static async save(req: Request) {
        req.body.quizId = req.params.quizId;
        return Question.create(req.body) as Promise<QuestionClass>;
    }

    static async update(req: Request): Promise<QuestionClass> {
        const question = await this.findById(req);
        question.set(req.body);
        return question.save();
    }

    static async delete(req: Request): Promise<void> {
        const question = await this.findById(req);
        return question.destroy();
    }

}