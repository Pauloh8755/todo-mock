import { faker } from "@faker-js/faker";
import fs from "fs";

const generateRandomUsers = (totalUsers) => {
  const userList = [];
  for (let i = 0; i < totalUsers; i++) {
    const user = {
      id: i + 1,
      name: faker.name.findName(),
      email: faker.internet.email(),
    };
    userList.push(user);
  }
  return userList;
};

const generateRandomTodos = (userList) => {
  let todoList = [];

  userList.map((user) => {
    const todosAmount = Math.floor(Math.random * 10) + 1;
    for (let i = 0; i < 3; i++) {
      const todo = {
        id: faker.datatype.uuid(),
        description: faker.git.commitMessage(),
        dueDate: faker.date.future(),
        isCompleted: faker.datatype.boolean(),
        userId: user.id,
      };
      todoList.push(todo);
    }
  });
  console.log(todoList);
  return todoList;
};

const writeDatabaseFile = (fileName, data, callback) => {
  fs.writeFile(fileName, JSON.stringify(data), callback);
};

const data = {};
data.users = generateRandomUsers(15);
data.todos = generateRandomTodos(data.users);

writeDatabaseFile("db.json", data, (err) => {
  if (err) throw err;
  console.log("finish");
});
