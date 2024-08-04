import { Request } from "express";
import { CustomError } from "../utils/CustomError";
import { OpenQuestionAnswer } from "../models/Database";
import { OpenQuestionAnswer as OpenQuestionAnswerClass } from "../models/OpenQuestionAnswer";
import { OpenQuestionController } from "./OpenQuestionController";
import { QuizAttemptController } from "./QuizAttemptController";

export class OpenQuestionAnswerController {

    static async findById(req: Request): Promise<OpenQuestionAnswerClass> {
        const answer = await OpenQuestionAnswer.findByPk(req.params.answerId);
        if (!answer)
            throw new CustomError(404, 'The answer does not exist');
        return answer;
    }

    static async isCorrect(req: Request): Promise<Boolean> {
        const question = await OpenQuestionController.findById(req);
        return req.body.answer === question.correctAnswer;
    }

    static async isAlreadyAnswered(req: Request): Promise<Boolean> {
        const answers: OpenQuestionAnswerClass[] = await OpenQuestionAnswer.findAll({
            where: {
                quizAttemptId: req.params.attemptId,
                openQuestionId: req.params.questionId
            }
        });
        return answers.length > 0;
    }

    static async save(req: Request): Promise<OpenQuestionAnswerClass> {
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
        req.body.openQuestionId = req.params.questionId;
        req.body.quizAttemptId = req.params.attemptId;
        return OpenQuestionAnswer.create(req.body);
    }
}

