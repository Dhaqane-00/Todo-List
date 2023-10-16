const fs = require('fs');

class Todo {
  constructor() {
    this.todoList = [];
    this.loadTodoList();
  }

  loadTodoList() {
    try {
      const data = fs.readFileSync('todo.json', 'utf-8');
      this.todoList = JSON.parse(data);
    } catch (error) {
      console.log('Failed to load todo list:', error.message);
    }
  }

  saveTodoList() {
    try {
      fs.writeFileSync('todo.json', JSON.stringify(this.todoList, null, 2), 'utf-8');
    } catch (error) {
      console.log('Failed to save todo list:', error.message);
    }
  }

  getTodos() {
    return this.todoList;
  }

  generateId() {
    let maxId = 0;
    for (const todo of this.todoList) {
      if (todo.id > maxId) {
        maxId = todo.id;
      }
    }
    return maxId + 1;
  }

  addTodo(todoText) {
    const id = this.generateId();
    const newTodo = {
      id,
      text: todoText
    };
    this.todoList.push(newTodo);
    this.saveTodoList();
    return newTodo;
  }

  updateTodo(todoId, updatedTodoText) {
    const todoIndex = this.todoList.findIndex((todo) => todo.id === todoId);
    if (todoIndex !== -1) {
      this.todoList[todoIndex].text = updatedTodoText;
      this.saveTodoList();
      return true;
    }
    return false;
  }

  deleteTodo(todoId) {
    const todoIndex = this.todoList.findIndex((todo) => todo.id === todoId);
    if (todoIndex !== -1) {
      this.todoList.splice(todoIndex, 1);
      this.saveTodoList();
      return true;
    }
    return false;
  }
}

module.exports = Todo;