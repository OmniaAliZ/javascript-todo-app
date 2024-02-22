const input = document.getElementById("Todo-input"); //input
const addButton = document.getElementById("Todo-button"); //button
const todos = document.getElementById("todo-list"); //ul

addButton.addEventListener("click", function () {
  let todoLi = document.createElement("li"); // li contains: checkbox - delete button - edit button - span

  let todoSpanDiv = document.createElement("div"); //container for checkbox - span
  todoSpanDiv.classList.add("check-text");

  let todoBtnsDiv = document.createElement("div"); //container for delete button - edit button
  todoBtnsDiv.classList.add("edit-delete");

  let checkBox = document.createElement("input"); // li check box
  checkBox.type = `checkbox`;
  checkBox.classList.add("check-box");
  todoSpanDiv.appendChild(checkBox);

  let todo = document.createElement("span"); // li text
  todo.innerText = `${input.value}`;
  todoSpanDiv.appendChild(todo);

  let delBtn = document.createElement("button"); // li delete button
  delBtn.innerHTML = `<i class="fa-solid fa fa-trash" style="color: #ffffff;"></i>`;
  delBtn.classList.add("delete-button");
  todoBtnsDiv.appendChild(delBtn);

  let editBtn = document.createElement("button"); // li edit button
  editBtn.innerHTML = `<i class="fa-solid fa fa-pencil" style="color: #ffffff;"></i>`;
  editBtn.classList.add("edit-button");
  todoBtnsDiv.appendChild(editBtn);

  // const emptyImage = document.querySelector(".empty-image");

  if (input.value === "") {
    alert("please enter a task first !");
  } else {
    todoLi.appendChild(todoSpanDiv);
    todoLi.appendChild(todoBtnsDiv);
    todos.appendChild(todoLi);
    // showImg();
  }
  input.value = "";

  delBtn.addEventListener("click", function (event) {
    let target = event.target;
    target.parentElement.parentElement.parentElement.remove();
    // showImg();
  });
  checkBox.addEventListener("click", function () {
    let style = checkBox.parentElement.style.textDecoration;
    if (style === `line-through`) {
      checkBox.parentElement.style.textDecoration = `none`;
    } else {
      checkBox.parentElement.style.textDecoration = `line-through`;
    }
  });

  // function showImg() {

  //   // Document.getElementsByTagName()
  //   let isEmpty = document.getElementById("todo-list").getElementsByTagName("li").length;
  //   if(!isEmpty){
  //               emptyImage.style.display = "block";
  //           } else {
  //             emptyImage.style.display = "none";
  //           }
  // }
});
