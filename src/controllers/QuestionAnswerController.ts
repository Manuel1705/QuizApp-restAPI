import { Request } from "express";
import { CustomError } from "../utils/CustomError";
import { QuestionAnswer } from "../models/Database";
import { QuestionAnswer as QuestionAnswerClass } from "../models/QuestionAnswer";
import { QuestionController } from "./QuestionController";
import { QuizAttemptController } from "./QuizAttemptController";

export class QuestionAnswerController {

    static async findById(req: Request): Promise<QuestionAnswerClass> {
        const answer = await QuestionAnswer.findByPk(req.params.answerId);
        if (!answer)
            throw new CustomError(404, 'The answer does not exist');
        return answer;
    }

    static async isCorrect(req: Request): Promise<Boolean> {
        const question = await QuestionController.findById(req);
        return req.body.answer === question.correctAnswer;
    }

    static async isAlreadyAnswered(req: Request): Promise<Boolean> {
        const answers: QuestionAnswerClass[] = await QuestionAnswer.findAll({
            where: {
                quizAttemptId: req.params.attemptId,
                questionId: req.params.questionId
            }
        });
        return answers.length > 0;
    }

    static async save(req: Request): Promise<QuestionAnswerClass> {
        if (await this.isAlreadyAnswered(req)) {
            throw new CustomError(400, 'The question has already been answered');
        }
        if (await this.isCorrect(req)) {
            req.body.correct = true;
        }
        else {
            req.body.correct = false;
            QuizAttemptController.addError(req);
        }
        req.body.id = req.params.answerId;
        req.body.QuestionId = req.params.questionId;
        req.body.quizAttemptId = req.params.attemptId;
        return QuestionAnswer.create(req.body);
    }
}