import { Sequelize, DataTypes, Model } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import { MultipleChoiceQuestion, QuizAttempt } from "./Database";

interface MultipleChoiceQuestionAnswerAttributes {
    id?: number;
    answer: string;
    correct: boolean;
    multipleChoiceQuestionId: number;
    quizAttemptId: number;
}

export class MultipleChoiceQuestionAnswer extends Model<MultipleChoiceQuestionAnswerAttributes> implements MultipleChoiceQuestionAnswerAttributes {
    public id!: number;
    public answer!: string;
    public correct!: boolean;
    public multipleChoiceQuestionId!: number;
    public quizAttemptId!: number;
}

export function createModel(sequelize: Sequelize<PostgresDialect>): typeof MultipleChoiceQuestionAnswer {
    MultipleChoiceQuestionAnswer.init({
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
        multipleChoiceQuestionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: MultipleChoiceQuestion,
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
        modelName: 'MultipleChoiceQuestionAnswer'
    });

    return MultipleChoiceQuestionAnswer;
}