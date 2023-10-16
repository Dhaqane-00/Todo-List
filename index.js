const readline = require('readline');
const Todo = require('./todo');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const todo = new Todo();

function displayMenu() {
  console.log('\n===== Todo List =====');
  console.log('1. View Todos');
  console.log('2. Add Todo');
  console.log('3. Update Todo');
  console.log('4. Delete Todo');
  console.log('5. Quit');
  console.log('======================');
}

function promptInput(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (input) => {
      resolve(input);
    });
  });
}

async function main() {
  let exit = false;

  while (!exit) {
    displayMenu();
    const choice = await promptInput('Enter your Action: ');

    switch (choice) {
      case 'View': {
        const todos = todo.getTodos();
        console.log('\n===== Todos =====');
        todos.forEach((todo) => {
          console.log(`${todo.id}. ${todo.text}`);
        });
        console.log('==================');
        break;
      }
      case 'Add': {
        const newTodoText = await promptInput('Enter a new todo: ');
        const newTodo = todo.addTodo(newTodoText);
        if (newTodo) {
          console.log(`Todo with ID ${newTodo.id} added successfully!`);
        } else {
          console.log('Failed to add todo.');
        }
        break;
      }
      case 'Update': {
        const todos = todo.getTodos();
        console.log('\n===== Todos =====');
        todos.forEach((todo) => {
          console.log(`${todo.id}. ${todo.text}`);
        });
        console.log('==================');
        const todoId = parseInt(await promptInput('Enter the ID of the todo to update: '));
        const updatedTodoText = await promptInput('Enter the updated todo: ');
        const success = todo.updateTodo(todoId, updatedTodoText);
        if (success) {
          console.log(`Todo with ID ${todoId} updated successfully!`);
        } else {
          console.log(`Failed to update todo with ID ${todoId}.`);
        }
        break;
      }
      case 'Delete': {
        const todos = todo.getTodos();
        console.log('\n===== Todos =====');
        todos.forEach((todo) => {
          console.log(`${todo.id}. ${todo.text}`);
        });
        console.log('==================');
        const todoId = parseInt(await promptInput('Enter the ID of the todo to delete: '));
        const success = todo.deleteTodo(todoId);
        if (success) {
          console.log(`Todo with ID ${todoId} deleted successfully!`);
        } else {
          console.log(`Failed to delete todo with ID ${todoId}.`);
        }
        break;
      }
      case '5': {
        exit = true;
        break;
      }
      default: {
        console.log('Invalid choice. Please try again.');
        break;
      }
    }
  }

  rl.close();
}

main();