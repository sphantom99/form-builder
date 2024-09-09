import { Request, Response } from "express";
import { generateUniqueString, getUserInfo } from "../../utils";
const db = require("../../db.ts");
exports.createForm = async (req: Request, res: Response) => {
  try {
    const { fields, description, title } = req.body;
    if (!fields) {
      return res.status(400).send("formBody is required");
    }
    const insertFormQuery = `INSERT INTO forms (formShapeJSON, createdBy, dateCreated, dateModified, modifiedBy)
            VALUES ($1, 1, NOW(), NOW(), 1) RETURNING uid`;
    const values = [{ fields, description, title }];

    const insertLinkQuery = `INSERT INTO form_links (formuid, link ) VALUES ($1, $2) RETURNING link`;
    try {
      await db.query("BEGIN");
      const result = await db.query(insertFormQuery, values);
      const linkUid = await db.query(insertLinkQuery, [
        result.rows[0].uid,
        generateUniqueString(),
      ]);
      await db.query("COMMIT");
      res.json(linkUid.rows[0].link);
    } catch (err) {
      console.error(err);
      await db.query("ROLLBACK");
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("function error");
  }
};

exports.getForms = async (req: Request, res: Response) => {
  const query = `SELECT * FROM forms inner join form_links on forms.uid = form_links.formuid`;
  try {
    const result = await db.query(query, []);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateForm = (req: Request, res: Response) => {
  // Logic to update a form by ID
  res.send("Form updated");
};

exports.deleteForm = async (req: Request, res: Response) => {
  try {
    const { formId } = req.params;
    if (!formId) {
      return res.status(400).send("uid is required");
    }
    const query = `DELETE FROM forms WHERE uid = $1`;
    const values = [formId];
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

exports.getForm = async (req: Request, res: Response) => {
  try {
    const { formId } = req.params;
    if (!formId) {
      return res.status(400).send("uid is required");
    }
    const query = `SELECT * FROM forms inner join form_links on forms.uid = form_links.formuid where form_links.link = $1`;
    const values = [formId];
    try {
      const result = await db.query(query, values);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("function error");
  }
};

exports.getFormResponses = async (req: Request, res: Response) => {
  try {
    const { formId } = req.params;
    if (!formId) {
      return res.status(400).send("uid is required");
    }
    const query = `SELECT * FROM form_responses WHERE formuid = $1`;
    const values = [formId];
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
