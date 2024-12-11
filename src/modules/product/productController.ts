import { Request, Response } from "express";
import { db } from "../../database";

export const getProduct = async (req: Request, res: Response) => {
  const response = await db.products.findMany();
  res.json(response);
};
