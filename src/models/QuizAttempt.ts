import { Sequelize, DataTypes, Model } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import { Quiz } from "./Database";

interface QuizAttemptAttributes {
    id?: number;
    username: string;
    quizId: number;
    errors?: number;
    passed?: boolean;
}

export class QuizAttempt extends Model<QuizAttemptAttributes> implements QuizAttemptAttributes {
    public id!: number;
    public username!: string;
    public quizId!: number;
    public errors!: number;
    public passed!: boolean;
}

export function createModel(sequelize: Sequelize<PostgresDialect>): typeof QuizAttempt {
    QuizAttempt.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Anonymous'
        },
        quizId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Quiz,
                key: 'id'
            }
        },
        errors: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        passed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        sequelize,
        modelName: 'QuizAttempt'
    });

    return QuizAttempt;
}