import { Sequelize, DataTypes, Model } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import { OpenQuestion, QuizAttempt } from "./Database";

interface OpenQuestionAnswerAttributes {
    id?: number;
    answer: string;
    correct: boolean;
    openQuestionId: number;
    quizAttemptId: number;
}

export class OpenQuestionAnswer extends Model<OpenQuestionAnswerAttributes> implements OpenQuestionAnswerAttributes {
    public id!: number;
    public answer!: string;
    public correct!: boolean;
    public openQuestionId!: number;
    public quizAttemptId!: number;
}

export function createModel(sequelize: Sequelize<PostgresDialect>): typeof OpenQuestionAnswer {
    OpenQuestionAnswer.init({
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
        openQuestionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: OpenQuestion,
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
        modelName: 'OpenQuestionAnswer'
    });

    return OpenQuestionAnswer;
}