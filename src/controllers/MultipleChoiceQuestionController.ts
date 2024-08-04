import { Request } from "express";
import { CustomError } from "../utils/CustomError";
import { MultipleChoiceQuestion } from "../models/Database";
import { MultipleChoiceQuestion as MultipleChoiceQuestionClass } from "../models/MultipleChoiceQuestion";

export class MultipleChoiceQuestionController {

    static async findById(req: Request): Promise<MultipleChoiceQuestionClass> {
        const question = await MultipleChoiceQuestion.findByPk(req.params.questionId);
        if (!question)
            throw new CustomError(404, 'The question does not exist');
        return question;
    }

    static async getByQuiz(req: Request): Promise<MultipleChoiceQuestionClass[]> {
        return MultipleChoiceQuestion.findAll({
            where: {
                quizId: req.params.quizId
            }
        });
    }

    static async save(req: Request) {
        req.body.quizId = req.params.quizId;
        return MultipleChoiceQuestion.create(req.body) as Promise<MultipleChoiceQuestionClass>;
    }

    static async update(req: Request): Promise<MultipleChoiceQuestionClass> {
        const question = await this.findById(req);
        question.set(req.body);
        return question.save();
    }

    static async delete(req: Request): Promise<void> {
        const question = await this.findById(req);
        return question.destroy();
    }

}