const input = document.getElementById("todo-input"); // title input
const inputDescription = document.getElementById("input-description"); //description input
const addButton = document.getElementById("todo-button"); //button
const emptyTasks = document.getElementById("empty-tasks");
const searchBar = document.getElementById("search"); //.querySelector(".search"); //search input

let todos = document.getElementById("todo-list"); //ul

let tasksCounter = document.getElementById("counter"); // counter span

// first, check the local storage whether it has counter value or not, if yes, get the counter from localstorage, if no set it to 0

let counterItems = 0;

if (window.localStorage.getItem("counter")) {
  counterItems = JSON.parse(window.localStorage.getItem("counter"));
  if (counterItems < 0) {
    counterItems = 0;
  }
}
// let todosStorage = JSON.parse(localStorage.getItem("todo-list"));

let tasks = [];

//check tasks in "storage" then show tasks in "array"
if (window.localStorage.getItem("tasks")) {
  tasks = JSON.parse(window.localStorage.getItem("tasks"));
}
//get data
getTasks();

addButton.onclick = function () {
  if (input.value) {
    addTask(input.value, inputDescription.value); // add task to array of objects
    input.value = ""; //empty input field
    inputDescription.value = ""; //empty input feild
    counterItems++;
    tasksCounter.textContent = counterItems;
    showImg();
    counterToLocal();
  } else {
    alert("please enter a task first !");
  }
};

function addTask(taskTitle, taskDescription) {
  const task = {
    date: Date.now(),
    title: taskTitle,
    description: taskDescription,
    checked: false,
  };
  tasks.unshift(task);

  showTasks(tasks);

  //local storage:
  addToLocal(tasks);
}

function showTasks(tasks) {
  tasksCounter.innerText = counterItems;
  todos.innerHTML = "";

  showImg();
  tasks.forEach((task) => {
    let todoList = document.createElement("li"); // li contains: 3 divs
    todoList.classList.add("todo");
    todoList.setAttribute("task-id", task.date); // id for li

    let todoCheckDiv = document.createElement("div"); //container for checkbox
    todoCheckDiv.classList.add("check-div");

    let todoSpanDiv = document.createElement("div"); //container for title span - description span
    todoSpanDiv.classList.add("text-text");

    let todoBtnsDiv = document.createElement("div"); //container for delete button - edit button
    todoBtnsDiv.classList.add("edit-delete");

    let checkBox = document.createElement("input"); // li check box
    checkBox.type = `checkbox`;
    checkBox.classList.add("check-box");
    todoCheckDiv.appendChild(checkBox);

    if (task.checked) {
      todoList.className = "todo done"; //.todo.done
      // checkBox.checked = true;
      checkBox.setAttribute("checked", true);
      todoList.style.textDecoration = `line-through`;
    }

    let todo = document.createElement("span"); // li title
    todo.innerText = `${task.title}`;
    todo.className = "title";
    todoSpanDiv.appendChild(todo);

    let description = document.createElement("span"); //li discription
    description.innerText = `${task.description}`;
    description.className = "description";
    todoSpanDiv.appendChild(description);

    let delBtn = document.createElement("button"); // li delete button
    delBtn.innerHTML = `<i class="fa-solid fa fa-trash" style="color: #ffffff;"></i>`;
    delBtn.classList.add("delete-button");
    todoBtnsDiv.appendChild(delBtn);

    let editBtn = document.createElement("button"); // li edit button
    editBtn.innerHTML = `<i class="fa-solid fa fa-pencil" style="color: #ffffff;"></i>`;
    editBtn.classList.add("edit-button");
    todoBtnsDiv.appendChild(editBtn);

    todoList.append(todoCheckDiv, todoSpanDiv, todoBtnsDiv);
    todos.appendChild(todoList);

    delBtn.addEventListener("click", (e) => {
      let target = e.target.parentElement.parentElement.parentElement;
      //remove li
      target.remove();
      //remove local
      delTask(target.getAttribute("task-id"));
    });

    checkBox.addEventListener("click", function () {
      let style = checkBox.parentElement.parentElement.style.textDecoration;
      if (style === `line-through`) {
        todoList.className = "todo";
        checkBox.parentElement.parentElement.style.textDecoration = `none`;
        task.checked = false;
        checkBox.setAttribute("checked", false);
      } else {
        todoList.className = "todo done";
        checkBox.parentElement.parentElement.style.textDecoration = `line-through`;
        task.checked = true;
        checkBox.setAttribute("checked", true);
      }
      addToLocal(tasks);
      counterToLocal();
    });

    editBtn.addEventListener("click", () => {
      // let previousTitle = task.title;
      // let previousDiscription =task.description;

      const newTitle = prompt("Edit Todo :", task.title);
      const newDescription = prompt("Edit Discription : ", task.description);

      if (!newTitle) return;
      if (!newDescription) return;
      task.title = newTitle;
      task.description = newDescription;

      addToLocal(tasks);
      counterToLocal();
      showTasks(tasks);
    });

    searchBar.addEventListener("keyup", function searchTodo(e) {
      const searchText = e.target.value.toLowerCase();
      if (searchText !== "") {
        let filterArray = tasks.filter((task) => {
          return task.title.toLowerCase().includes(searchText);
        });
        showTasks(filterArray);
      } else {
        getTasks();
      }
    });
  });
}

function delTask(taskId) {
  tasks = tasks.filter((task) => task.date != taskId);
  addToLocal(tasks);
  counterItems--;

  tasksCounter.textContent = counterItems;

  showImg();
  counterToLocal();
}

function addToLocal(tasks) {
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
  getTasks();
}
function counterToLocal() {
  window.localStorage.setItem("counter", JSON.stringify(counterItems));
}

function getTasks() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    showTasks(tasks);
  }
}

function showImg() {
  if (counterItems == 0) {
    emptyTasks.style.display = "block";
  } else {
    emptyTasks.style.display = "none";
  }
}
// function showImg() {

//     // Document.getElementsByTagName()
//     let isEmpty = document.getElementById("todo-list").getElementsByTagName("li").length;
//     if(!isEmpty){
//                 emptyTasks.style.display = "block";
//             } else {
//               emptyTasks.style.display = "none";
//             }}
