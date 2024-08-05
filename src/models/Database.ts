import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import { createModel as createUserModel } from './User';
import { createModel as createQuizModel } from './Quiz';
import { createModel as createQuestionModel } from './Question';
import { createModel as createQuizAttemptModel } from './QuizAttempt';
import { createModel as createAnswerModel } from './QuestionAnswer';

import 'dotenv/config';


export const database = new Sequelize({
    dialect: PostgresDialect,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    clientMinMessages: 'notice',
});


export const User = createUserModel(database);
export const Quiz = createQuizModel(database);
export const Question = createQuestionModel(database);
export const QuizAttempt = createQuizAttemptModel(database);
export const QuestionAnswer = createAnswerModel(database);

User.hasMany(Quiz, { foreignKey: 'creator' });
Quiz.belongsTo(User, { foreignKey: 'creator' });

Quiz.hasMany(Question, { foreignKey: 'quizId' });
Question.belongsTo(Quiz, { foreignKey: 'quizId' });

Quiz.hasMany(QuizAttempt, { foreignKey: 'quizId' });
QuizAttempt.belongsTo(Quiz, { foreignKey: 'quizId' });

Question.hasMany(QuestionAnswer, { foreignKey: 'questionId' });
QuestionAnswer.belongsTo(Question, { foreignKey: 'questionId' });

QuizAttempt.hasMany(QuestionAnswer, { foreignKey: 'quizAttemptId' });
QuestionAnswer.belongsTo(QuizAttempt, { foreignKey: 'quizAttemptId' });

database
    .sync()
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((err) => {
        console.error('Error synchronizing database:', err);
    });
