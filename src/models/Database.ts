import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import { createModel as createUserModel } from './User';
import { createModel as createQuizModel } from './Quiz';
import { createModel as createOpenQuestionModel } from './OpenQuestion';
import { createModel as createMultipleChoiceQuestionModel } from './MultipleChoiceQuestion';
import { createModel as createQuizAttemptModel } from './QuizAttempt';
import { createModel as createOpenQuestionAnswerModel } from './OpenQuestionAnswer';
import { createModel as createMultipleChoiceAnswerModel } from './MultipleChoiceQuestionAnswer';

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
export const OpenQuestion = createOpenQuestionModel(database);
export const MultipleChoiceQuestion = createMultipleChoiceQuestionModel(database);
export const QuizAttempt = createQuizAttemptModel(database);
export const OpenQuestionAnswer = createOpenQuestionAnswerModel(database);
export const MultipleChoiceQuestionAnswer = createMultipleChoiceAnswerModel(database);

User.hasMany(Quiz, { foreignKey: 'creator' });
Quiz.belongsTo(User, { foreignKey: 'creator' });

Quiz.hasMany(OpenQuestion, { foreignKey: 'quizId' });
OpenQuestion.belongsTo(Quiz, { foreignKey: 'quizId' });

Quiz.hasMany(MultipleChoiceQuestion, { foreignKey: 'quizId' });
MultipleChoiceQuestion.belongsTo(Quiz, { foreignKey: 'quizId' });

Quiz.hasMany(QuizAttempt, { foreignKey: 'quizId' });
QuizAttempt.belongsTo(Quiz, { foreignKey: 'quizId' });

OpenQuestion.hasMany(OpenQuestionAnswer, { foreignKey: 'openQuestionId' });
OpenQuestionAnswer.belongsTo(OpenQuestion, { foreignKey: 'openQuestionId' });

MultipleChoiceQuestion.hasMany(MultipleChoiceQuestionAnswer, { foreignKey: 'multipleChoiceQuestionId' });
MultipleChoiceQuestionAnswer.belongsTo(MultipleChoiceQuestion, { foreignKey: 'multipleChoiceQuestionId' });

QuizAttempt.hasMany(OpenQuestionAnswer, { foreignKey: 'quizAttemptId' });
OpenQuestionAnswer.belongsTo(QuizAttempt, { foreignKey: 'quizAttemptId' });

QuizAttempt.hasMany(MultipleChoiceQuestionAnswer, { foreignKey: 'quizAttemptId' });
MultipleChoiceQuestionAnswer.belongsTo(QuizAttempt, { foreignKey: 'quizAttemptId' });

database
    .sync()
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((err) => {
        console.error('Error synchronizing database:', err);
    });
