let todoInput = document.querySelector('.todo-input');
let todoAddBtn = document.querySelector('.todo-add-task-btn');
let taskContainer = document.querySelector(".container-tasks");

window.onload = () => {
  if(localStorage.getItem('tasks')){
    arrTodo = JSON.parse(localStorage.getItem("tasks"));
    createNewTask();
  }
}

let arrTodo = [];

todoAddBtn.addEventListener('click', addTolS);

function createNewTask() {
  taskContainer.innerHTML = ""; 
    arrTodo.forEach((element, index) => {
    let li = createTag("li", ["task", `${(element.checked == true) ? "task-checked" : null}`]);
    li.setAttribute("data-index", `${index}`);
    li.setAttribute("data-check", `${(element.checked == true) ? "true" : "false"}`);
    let taskTextWrapper = createTag("div", ["task-text__wrapper"]);
    let span = createTag("span", ["task-text"]);
    span.addEventListener('click', editTextTask);
    span.textContent = element.todoText;
    taskTextWrapper.appendChild(span);
    let todoChecked = createTag("div", ["todo-checked"]);
    todoChecked.addEventListener("click", readyTask);
    let taskDeleteBtn = createTag("button", ["task-delete"]);
    taskDeleteBtn.addEventListener("click", deleteTask);
    li.append(todoChecked, taskTextWrapper, taskDeleteBtn);
    taskContainer.appendChild(li);
    todoInput.value = '';
    })
}

function editTextTask(e){
  if(e.path[2].getAttribute('data-check') == 'true'){
    return false
  } else {
    let index = e.path[2].getAttribute('data-index');
    let text = arrTodo[index].todoText;
    e.path[1].children[0].remove();
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.value = text;
    e.path[1].append(input);
    input.focus();
    input.onkeydown = (e) => {
      if (e.key == "Enter"){
        if(e.path[0].value == ""){
          return false;
        } else{
          arrTodo[index].todoText = e.path[0].value;
          updateLocal();
          createNewTask();
        }
      } 
    };
  }
}

function addTolS() {
  if(todoInput.value == ""){
    return false;
  } else {
    let newObjTask = {
      todoText: todoInput.value,
      checked: false,
    }
    arrTodo.push(newObjTask);
    updateLocal();
    createNewTask();
  }
}

function updateLocal(){
  localStorage.setItem('tasks', JSON.stringify(arrTodo));
}

function createTag(tag, cls) {
  let f = tag;
  f = document.createElement(`${f}`);
  for (let i = 0; i < cls.length; i++) {
    f.classList.add(`${cls[i]}`);
  }
  return f;
}

function deleteTask(e) {
  let Li = e.path[1];
  let index = Li.getAttribute('data-index');
  arrTodo.splice(index, 1);
  updateLocal();
  createNewTask();
}

function readyTask(e) {
  let Li = e.path[1];
  let index = Li.getAttribute('data-index');
  let check = Li.getAttribute('data-check');
  let a = arrTodo[index];
  if(check == "false"){
    a.checked = true;
  }else if(check == "true"){
    a.checked = false;
  }
  updateLocal();
  createNewTask();
}