import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/CustomError";


export function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    res.status(err.status).json(err.message);
}