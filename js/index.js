// Initialize a new TaskManager with currentId set to 0
const taskManager = new TaskManager(0);
// Load the tasks from localStorage
taskManager.load();
// Render the loaded tasks to the page
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

   // Call this to clear all the form fields after the submission
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
  // Form validation for Task Status Field not empty
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
// Add an 'onclick' event listener to the Tasks List
taskList.addEventListener("click", (event) => {
  // Check if a "Mark As Done" button was clicked
  if (event.target.classList.contains('done-button')) {
    // Get the correct parent Task, yours might be slightly different
    const parentTask =
      event.target.parentElement.parentElement.parentElement;
    // Get the taskId of the parent Task and turn it into a number.
    const taskId = Number(parentTask.dataset.taskId);
    // Get the task from the TaskManager using the taskId
    const task = taskManager.getTaskById(taskId);
    // Update the task status to 'DONE'
    task.status = "Done";
    // Render the tasks
    taskManager.save();
    taskManager.render();
  } 
});
