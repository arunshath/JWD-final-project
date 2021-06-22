const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  const html = `<li class="list-group-item" data-task-id="${id}">
  <div class="card" style="width: 18rem">
    <h5 class="card-title">${name}</h5>
    <div class="card-body">
      <h5 class="card-title">${assignedTo}</h5>
      <p class="card-text">${description}</p>
      <p class="card-text">${dueDate}</p>
      <p class="card-text">${status}</p>
      <a class="btn btn-success done-button">Mark as Done</a>
      <a class="btn btn-danger">Delete</a>
    </div>
  </div>
</li>`;
  return html;
};

// Create the TaskManager class
class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  // Create the addTask method
  addTask(name, description, assignedTo, dueDate, status) {
   
    
    const task = {
      // Increment the current Id for each new task
      id: this.currentId++,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status,
    };

    this.tasks.push( task );
  }
  getTaskById(taskId) {
    // Create a variable to store the found task
    let foundTask;
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id === taskId) {
          foundTask = task;
      }
    }
  
    return foundTask;
  }

  // Create the render method
  render() {
    let tasksHtmlList = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      const date = new Date(task.dueDate);
      const formattedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      // Create the task html
      const taskHtml = createTaskHtml(
        task.id,
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status
      );
      
      tasksHtmlList.push(taskHtml);
    }

    // Create the tasksHtml by joining each item in the tasksHtmlList
    const tasksHtml = tasksHtmlList.join("\n");

    // Set the inner html of the tasksList on the page
    const tasksList = document.querySelector("#task-list");
    tasksList.innerHTML = tasksHtml;
  }

  save() {
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem("tasks", tasksJson);
    const currentId = String(this.currentId);
    localStorage.setItem("currentId", currentId);
  }

  load() {
    if (localStorage.getItem("tasks")) {
      const tasksJson = localStorage.getItem("tasks");
      this.tasks = JSON.parse(tasksJson);
    }

    if (localStorage.getItem("currentId")) {
      const currentId = localStorage.getItem("currentId");
      this.currentId = Number(currentId);
    }
  }

  deleteTask(taskId) {
    const newTasks = [];

    // Loop over the tasks
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id !== taskId) {
        newTasks.push(task);
      }
    }

    this.tasks = newTasks;
  }
}