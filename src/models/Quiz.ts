import { Sequelize, DataTypes, Model } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import { User } from "./Database";

interface QuizAttributes {
    id?: number;
    title: string;
    description: string;
    maxErrors: number;
    published?: boolean;
    creator?: string;
}

export class Quiz extends Model<QuizAttributes> implements QuizAttributes {
    public id!: number;
    public title!: string;
    public description!: string;
    public maxErrors!: number;
    public published!: boolean;
    public creator!: string;
}

export function createModel(sequelize: Sequelize<PostgresDialect>): typeof Quiz {
    Quiz.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        maxErrors: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        creator: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: User,
                key: 'username'
            }
        }
    }, {
        sequelize,
        modelName: 'Quiz'
    });

    return Quiz;
}
