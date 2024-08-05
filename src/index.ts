import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { errorHandler } from "./middlewares/errors";
import { authRouter } from "./routes/authRouter";
import { quizRouter } from "./routes/quizRouter";
import { QuestionRouter } from "./routes/QuestionRouter";
import { quizAttemptRouter } from "./routes/quizAttemptRouter";
import { QuestionAnswerRouter } from "./routes/QuestionAnswerRouter";

const app: Express = express();
const PORT: number = 3000;

app.use(express.json()); //parse JSON payloads
app.use(morgan("dev")); //log HTTP requests
app.use(cors()); //enable CORS


app.get("/", (req: Request, res: Response) => {
    res.status(200).json("Hello from the server!!!");
});

app.get('/error', (req: Request, res: Response, next: NextFunction) => {
    next({ status: 400, message: 'This is an error message' });
});

app.use(authRouter);
app.use(quizRouter);
app.use(QuestionRouter);
app.use(quizAttemptRouter);
app.use(QuestionAnswerRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App is listening on port 3000`);
});