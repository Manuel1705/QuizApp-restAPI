import { Sequelize, DataTypes, Model } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import { Quiz } from "./Database";

interface OpenQuestionAttributes {
    id?: number;
    question: string;
    correctAnswer: string;
    quizId: number;
}

export class OpenQuestion extends Model<OpenQuestionAttributes> implements OpenQuestionAttributes {
    public id!: number;
    public question!: string;
    public correctAnswer!: string;
    public quizId!: number;
}

export function createModel(sequelize: Sequelize<PostgresDialect>): typeof OpenQuestion {
    OpenQuestion.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correctAnswer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quizId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Quiz,
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'OpenQuestion'
    });

    return OpenQuestion;
}