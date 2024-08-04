import { Request } from 'express';
import { User } from '../models/Database';
import { User as UserClass } from '../models/User';
import { CustomError } from '../utils/CustomError';
import Jwt from 'jsonwebtoken';
import 'dotenv/config';

export class AuthController {

    static async checkCredentials(req: Request): Promise<boolean> {
        const user = UserClass.build(req.body); // .build() is a Sequelize method that creates an instance of the model, used it instead of new UserClass()
        const found = await User.findOne({
            where: {
                username: user.username,
                password: user.password
            }
        });
        if (!found)
            throw new CustomError(401, 'Invalid credentials');
        return true;
    }

    static async save(req: Request): Promise<UserClass> {
        const found = await User.findByPk(req.body.username);
        if (found)
            throw new CustomError(400, 'The user already exists');
        return User.create(req.body) as Promise<UserClass>;
    }

    static async issueToken(req: Request): Promise<string> {
        if (!process.env.TOKEN_SECRET)
            throw new CustomError(500, 'Missing environment variable TOKEN_SECRET');
        return Jwt.sign(
            { username: req.body.username },
            process.env.TOKEN_SECRET,
            { expiresIn: `${24 * 60 * 60}s` }
        );

    }

    static isTokenValid(token: string, callback: Jwt.VerifyCallback) {
        if (!process.env.TOKEN_SECRET)
            throw new Error('Missing environment variable TOKEN_SECRET');
        Jwt.verify(
            token,
            process.env.TOKEN_SECRET,
            callback);
    }
}