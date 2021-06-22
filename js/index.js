// Initialize a new TaskManager
const taskManager = new TaskManager(0);
// Load the tasks
taskManager.load();
// Render the loaded tasks
taskManager.render();

// Testing Area
console.log(taskManager)


// Select the New Task Form
const form = document.querySelector("#new-task-form");

// submit event listener
form.addEventListener("submit", (event) => {
    let validateName = document.querySelector("#taskname-input");
    let validateDescription = document.querySelector("#description-input");
    let validateAssignedTo = document.querySelector("#assignedto-input");
    let validateDueDate = document.querySelector("#due-date-input");
    let validateStatus = document.querySelector("#status-input");
    let validationFail = 0;

    
  event.preventDefault();

   //Clear all the form fields after the submission
   const clearFormFields = () => {
    validateName.value = "";
    validateDescription.value = "";
    validateAssignedTo.value = "";
    validateStatus.value = "To Do";
    validateDueDate.value = "";
    validateName.classList.remove("is-valid");
    validateDescription.classList.remove("is-valid");
    validateAssignedTo.classList.remove("is-valid");
    validateStatus.classList.remove("is-valid");
    validateDueDate.classList.remove("is-valid");
  };

  // event.stopPropagation();
  console.log("Task Name :" + validateName.value.length);
  console.log("Task Description :" + validateDescription.value.length);
  console.log("Task Assigned To :" + validateAssignedTo.value.length);
  console.log("Task Due Date :" + validateDueDate.value);
  console.log("Task Status:" + validateStatus.value);

  // Form validation for Task Name Field min length 5
  if (validateName.value.length > 5) {
    validateName.classList.add("is-valid");
    validateName.classList.remove("is-invalid");
  } else {
    validateName.classList.add("is-invalid");
    validateName.classList.remove("is-valid");
    validationFail++;
  }

  // Form validation for Task Description Field min length 5
  if (validateDescription.value.length > 5) {
    validateDescription.classList.add("is-valid");
    validateDescription.classList.remove("is-invalid");
  } else {
    validateDescription.classList.add("is-invalid");
    validateDescription.classList.remove("is-valid");
    validationFail++;
  }

  // Form validation for Task Assigned Field min length 2
  if (validateAssignedTo.value.length > 2) {
    validateAssignedTo.classList.add("is-valid");
    validateAssignedTo.classList.remove("is-invalid");
  } else {
    validateAssignedTo.classList.add("is-invalid");
    validateAssignedTo.classList.remove("is-valid");
    validationFail++;
  }  
  // Form validation for Due Date Field not empty
  
  if (validateDueDate.value) {
    validateDueDate.classList.add("is-valid");
    validateDueDate.classList.remove("is-invalid");
  } else {
    validateDueDate.classList.add("is-invalid");
    validateDueDate.classList.remove("is-valid");
    validationFail++;
  }
  // Form validation for Task Status Field
  if (validateAssignedTo.value) {
    validateAssignedTo.classList.add("is-valid");
    validateAssignedTo.classList.remove("is-invalid");
  } else {
    validateAssignedTo.classList.add("is-invalid");
    validateAssignedTo.classList.remove("is-valid");
    validationFail++;
  }
  // If validation fails then function 
  // will return. 
  // reset to 0.

  if (validationFail > 0) {
    validationFail = 0;
    return;
   } else {
      // Push the valid input into our tasks array
      taskManager.addTask(
        validateName.value,
        validateDescription.value,
        validateAssignedTo.value,
        validateDueDate.value,
        validateStatus.value
      );
      clearFormFields();
      taskManager.save();
      taskManager.render();
  }
});

const taskList = document.querySelector("#task-list");

taskList.addEventListener("click", (event) => {
  
  if (event.target.classList.contains('done-button')) {
    const parentTask =
      event.target.parentElement.parentElement.parentElement;
    const taskId = Number(parentTask.dataset.taskId);
    const task = taskManager.getTaskById(taskId);
    task.status = "Done";
    
    taskManager.save();
    taskManager.render();
  } 

   
   if (event.target.classList.contains("btn-danger")) {
    const parentTask =
      event.target.parentElement.parentElement.parentElement;
    const taskId = Number(parentTask.dataset.taskId);
    taskManager.deleteTask(taskId);

    taskManager.save();
    taskManager.render();
  }
});
