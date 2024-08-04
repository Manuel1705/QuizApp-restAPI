import { Sequelize, DataTypes, Model } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import { Quiz } from "./Database";

interface MultipleChoiceQuestionAttributes {
    id?: number;
    question: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    correctAnswer: string;
    quizId: number;
}

export class MultipleChoiceQuestion extends Model<MultipleChoiceQuestionAttributes> implements MultipleChoiceQuestionAttributes {
    public id!: number;
    public question!: string;
    public answer1!: string;
    public answer2!: string;
    public answer3!: string;
    public answer4!: string;
    public correctAnswer!: string;
    public quizId!: number;
}

export function createModel(sequelize: Sequelize<PostgresDialect>): typeof MultipleChoiceQuestion {
    MultipleChoiceQuestion.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false
        },
        answer1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        answer2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        answer3: {
            type: DataTypes.STRING,
            allowNull: false
        },
        answer4: {
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
        modelName: 'MultipleChoiceQuestion'
    });

    return MultipleChoiceQuestion;
}