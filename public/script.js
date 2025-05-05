const form = document.getElementById("form");
const newTodo = document.getElementById("new-todo");
const todoList = document.getElementById("todo-list");

async function fetchTodos() {
  const response = await fetch("/todos");

  const todos = await response.json();
  for (const todo of todos) {
    const todoItem = createTodoElement(todo);
    if (todoList) {
      todoList.appendChild(todoItem);
    }
  }
}

fetchTodos(); //一番最初にfetchTodos()を実行して、todosのデータを取得する。

// フォームが送信された時に実行される関数を定義
form.onsubmit = async (e) => {
  e.preventDefault(); // フォームがデフォルトで行う送信の挙動をキャンセル。送信の内容を自分で定義するため。
  const todo = newTodo.value;
  const response = await fetch("/todos", {
    method: "POST",
    body: JSON.stringify({ todo }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  const todoItem = createTodoElement(result);
  todoList.appendChild(todoItem);
  newTodo.value = "";
};

function createTodoElement(todo) {
  const todoItem = document.createElement("li");
  const todoText = document.createElement("span");
  todoText.textContent = todo.content;

  // 削除ボタンの作成
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "削除";
  deleteButton.onclick = async () => {
    await fetch(`/todos/${todo.id}`, {
      method: "DELETE", // GET, POST の仲間の一つ。削除を表す。
    });
    todoItem.remove();
  };

  // 編集ボタンの作成
  const editButton = document.createElement("button");
  editButton.textContent = "編集";
  editButton.onclick = async () => {
    const newContent = prompt("新しい内容を入力してください", todo.content);
    if (newContent) {
      const response = await fetch(`/todos/${todo.id}`, {
        method: "PATCH", // GET, POST の仲間の一つ。部分的な更新を表す。
        body: JSON.stringify({ content: newContent }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedTodo = await response.json();
      todoText.textContent = updatedTodo.content;
    }
  };

  todoItem.appendChild(todoText);
  todoItem.appendChild(editButton);
  todoItem.appendChild(deleteButton);
  return todoItem;
}
