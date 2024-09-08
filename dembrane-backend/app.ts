const express = require("express");
const port = 3000;
var session = require("express-session");
const formController = require("./src/controllers/formController");
const userController = require("./src/controllers/userController");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  console.log(process.env.PG_PASSWORD);
});
app.post("/forms", formController.createForm);
app.get("/forms", formController.getForms);
app.get("/forms/:formId", formController.getForm);
app.delete("/forms/:formId", formController.deleteForm);

app.get("/users/:userId", userController.getUser);
app.post("/users/:userId/forms", userController.answerForm);
app.post("/users", userController.createUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
