import { Request } from "express";
import { CustomError } from "../utils/CustomError";
import { MultipleChoiceQuestionAnswer } from "../models/Database";
import { MultipleChoiceQuestionAnswer as MultipleChoiceQuestionAnswerClass } from "../models/MultipleChoiceQuestionAnswer";
import { MultipleChoiceQuestionController } from "./MultipleChoiceQuestionController";
import { QuizAttemptController } from "./QuizAttemptController";

export class MultipleChoiceQuestionAnswerController {

    static async findById(req: Request): Promise<MultipleChoiceQuestionAnswerClass> {
        const answer = await MultipleChoiceQuestionAnswer.findByPk(req.params.answerId);
        if (!answer)
            throw new CustomError(404, 'The answer does not exist');
        return answer;
    }

    static async isCorrect(req: Request): Promise<Boolean> {
        const question = await MultipleChoiceQuestionController.findById(req);
        return req.body.answer === question.correctAnswer;
    }

    static async isAlreadyAnswered(req: Request): Promise<Boolean> {
        const answers: MultipleChoiceQuestionAnswerClass[] = await MultipleChoiceQuestionAnswer.findAll({
            where: {
                quizAttemptId: req.params.attemptId,
                multipleChoiceQuestionId: req.params.questionId
            }
        });
        return answers.length > 0;
    }

    static async save(req: Request): Promise<MultipleChoiceQuestionAnswerClass> {
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
        req.body.multipleChoiceQuestionId = req.params.questionId;
        req.body.quizAttemptId = req.params.attemptId;
        return MultipleChoiceQuestionAnswer.create(req.body);
    }
}