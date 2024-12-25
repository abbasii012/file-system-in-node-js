# Todo List Application

This is a simple command-line Todo List application built with Node.js. It allows you to add, list, and remove tasks from a JSON file.

## Prerequisites

- Node.js installed on your machine

## Setup

1. Clone the repository or download the code.
2. Navigate to the project directory.

## Usage

### Add a Task

To add a task, use the following command:

```bash
node todo.js add "Your task here"
```

### List Tasks

To list all tasks, use the following command:

```bash
node todo.js list
```

### Remove a Task

To remove a task, use the following command:

```bash
node todo.js remove <task_number>
```

Replace `<task_number>` with the number of the task you want to remove.

## Code Explanation

```javascript
const fs = require("fs");
const { parse } = require("path");
const filePath = "./todo.json";

const loadTasks = () => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const json = dataBuffer.toString()
        return JSON.parse(json);
    } catch (e) {
        return [];
    }
}

const saveTasks = (task) => {
  const json = JSON.stringify(task);
  fs.writeFileSync(filePath, json);
}

const listTasks = () => {  
    const tasks = loadTasks();
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
    });
}

const addTask = (task) => {
    const tasks = loadTasks();
    tasks.push(task);
    saveTasks(tasks);
    console.log("Task added");
}

const removeTask = (index) => {
    const tasks = loadTasks();
    if(index < 1 || index > tasks.length){
        console.log("Invalid task number");
        return;
    }
    tasks.splice(index - 1, 1);
    saveTasks(tasks);
    console.log("Task removed");
}

const command = process.argv[2];
const argument = process.argv[3];

if (command == "add") {
  addTask(argument);
} else if (command == "list") {
  listTasks();
} else if (command == "remove") {
  removeTask(parseInt(argument));
} else {
  console.log("Invalid command");
}
```

