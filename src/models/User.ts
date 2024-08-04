import { Sequelize, DataTypes, Model } from "@sequelize/core";
import { PostgresDialect } from '@sequelize/postgres';
import { createHash } from "crypto";

interface UserAttributes {
    username: string;
    password: string;
}
export class User extends Model<UserAttributes> implements UserAttributes {
    public username!: string;
    public password!: string;

    public setPassword(password: string): void {
        const hash = createHash("sha256");
        this.setDataValue("password", hash.update(password).digest("hex"));
    }
}

export function createModel(sequelize: Sequelize<PostgresDialect>): typeof User {
    User.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value: string) {
                const hash = createHash("sha256");
                this.setDataValue("password", hash.update(value).digest("hex"));
            }
        }
    }, {
        sequelize,
        modelName: 'User'
    });

    return User;
}