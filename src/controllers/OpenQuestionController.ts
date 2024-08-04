import { Request } from "express";
import { CustomError } from "../utils/CustomError";
import { OpenQuestion } from "../models/Database";
import { OpenQuestion as OpenQuestionClass } from "../models/OpenQuestion";

export class OpenQuestionController {

    static async findById(req: Request): Promise<OpenQuestionClass> {
        const question = await OpenQuestion.findByPk(req.params.questionId);
        if (!question)
            throw new CustomError(404, 'The question does not exist');
        return question;
    }

    static async getByQuiz(req: Request): Promise<OpenQuestionClass[]> {
        return OpenQuestion.findAll({
            where: {
                quizId: req.params.quizId
            }
        });
    }

    static async save(req: Request): Promise<OpenQuestionClass> {
        req.body.quizId = req.params.quizId;
        return OpenQuestion.create(req.body);
    }

    static async update(req: Request): Promise<OpenQuestionClass> {
        const question = await this.findById(req);
        question.set(req.body);
        return question.save();
    }

    static async delete(req: Request): Promise<void> {
        const question = await this.findById(req);
        return question.destroy();
    }
}
