import { Sequelize, DataTypes, Model } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import { Question, QuizAttempt } from "./Database";

interface QuestionAnswerAttributes {
    id?: number;
    answer: string;
    correct: boolean;
    questionId: number;
    quizAttemptId: number;
}

export class QuestionAnswer extends Model<QuestionAnswerAttributes> implements QuestionAnswerAttributes {
    public id!: number;
    public answer!: string;
    public correct!: boolean;
    public questionId!: number;
    public quizAttemptId!: number;
}

export function createModel(sequelize: Sequelize<PostgresDialect>): typeof QuestionAnswer {
    QuestionAnswer.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        correct: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        questionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Question,
                key: 'id'
            }
        },
        quizAttemptId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: QuizAttempt,
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'QuestionAnswer'
    });

    return QuestionAnswer;
}