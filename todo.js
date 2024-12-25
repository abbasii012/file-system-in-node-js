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
const removeTask =(index)=>{
    const tasks = loadTasks();
    if(index<1 || index>tasks.length){
        console.log("Invalid task number");
        return;
    }
    tasks.splice(index-1,1);
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
