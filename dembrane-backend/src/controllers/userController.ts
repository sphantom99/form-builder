import { Request, Response } from "express";
import { getUserInfo } from "../../utils";
const db = require("../../db.ts");
exports.getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).send("userId is required");
  }
  const userInfo = await getUserInfo(userId);
  if (userInfo) {
    res.json(userInfo);
  } else {
    res.status(404).send("User not found");
  }
};

exports.answerForm = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { formId, answers } = req.body;
    if (!userId || !formId || !answers) {
      return res.status(400).send("userId and formUid are required");
    }
    const query = `INSERT INTO form_responses (formuid, responsejson, userId, date_created) VALUES ($1, $2, $3, NOW())`;
    const result = await db.query(query, [formId, answers, userId]);
    res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.createUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send("username and password are required");
    }
    const query = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING uid`;
    const values = [username, password];
    try {
      const result = await db.query(query, values);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("function error");
  }
};
