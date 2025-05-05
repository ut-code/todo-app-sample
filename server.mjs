import express from "express";
import { PrismaClient } from "./generated/prisma/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const prisma = new PrismaClient(); //clientではなく、prismaという変数名にしてます。

app.get("/todos", async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const { todo } = req.body;
  const result = await prisma.todo.create({
    data: {
      content: todo,
    },
  });
  res.json(result); //結果をHTMLではなく、jsonの形式で返しています。
});

//":id"とは、パスパラメータといい。可変のidを指定することができる。
// 例えば、/todos/1のように指定すると、idが1のtodoを取得することができる。
app.patch("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const result = await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      content: content,
    },
  });
  res.json(result);
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const result = await prisma.todo.delete({
    where: {
      id: id,
    },
  });
  res.json(result);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
