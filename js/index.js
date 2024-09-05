// ~ >=========|> HTML Elements

let newTaskBtn = document.getElementById("newTask");
let modalEl = document.getElementById("modal");
let statusInput = document.getElementById("status");
let categoryInput = document.getElementById("category");
let titleInput = document.getElementById("title");
let descriptionInput = document.getElementById("description");
let addBtn = document.getElementById("addBtn");
let updateBtn = document.getElementById("updateBtn");
let searchInput = document.getElementById("searchInput");
let gridBtn = document.getElementById("gridBtn");
let barsBtn = document.getElementById("barsBtn");
let bars = document.querySelector(".bars");
let sections = document.querySelectorAll("section");
let tasks = document.querySelectorAll(".tasks");
let modeBtn = document.getElementById("mode");
let root = document.querySelector(":root");
let darkMode = document.getElementById("darkMode");



// &  App variables

let containers = {
  nextUp: document.getElementById("nextUp"),
  inProgress: document.getElementById("inProgress"),
  done: document.getElementById("done"),
};

var countersEl = {
  nextUp: document.getElementById("nextUp").querySelector("span"),
  inProgress: document.getElementById("inProgress").querySelector("span"),
  done: document.getElementById("done").querySelector("span"),
};


var tasksList = getTasksfromLocal();
for (var i = 0; i < tasksList.length; i++) {
  displayTask(i);
}

var counters = {
  nextUp: 0,
  inProgress: 0,
  done: 0,
};

var updatedIndex;

// *  Functions
// ? show modal function
function showModal() {
  modalEl.classList.replace("d-none", "d-flex");
  window.scroll(0,0);
  document.body.style.overflow ="hidden";
}
// ? hide modal function
function hideModal() {
  resetModal();
  modalEl.classList.replace("d-flex", "d-none");
  document.body.style.overflow ="auto";
}

function resetModal() {
  clearForm();
  addBtn.classList.replace("d-none", "d-block");
  updateBtn.classList.replace("d-block", "d-none");
}

function setTasksToLocal() {
  localStorage.setItem("tasks", JSON.stringify(tasksList));
}

function getTasksfromLocal() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function addTask() {
  var task = {
    status: statusInput.value,
    category: categoryInput.value,
    title: titleInput.value,
    description: descriptionInput.value,
    bgColor: "#0d1117",
  };

  tasksList.push(task);
  setTasksToLocal();
  displayTask(tasksList.length - 1);
  clearForm();
  hideModal();
}

function displayTask(index) {
  var cartona = `
  <div class="task" style="background-color: ${tasksList[index].bgColor}">
    <h3 class="text-capitalize">${tasksList[index]?.title}</h3>
    <p class="description text-capitalize">${tasksList[index]?.description}</p>
    <h4 class="category ${tasksList[index]?.category} text-capitalize">${tasksList[index]?.category}</h4>
    <ul class="task-options list-unstyled d-flex gap-3 fs-5 m-0">
      <li><i class="bi bi-pencil-square" onclick="getTaskInfo(${index})"></i></li>
      <li><i class="bi bi-trash-fill" onclick="deleteTask(${index})"></i></li>
      <li><i class="bi bi-palette-fill" onclick="changeBackgroundColor(event, ${index})"></i></li>
    </ul>
  </div>
  `;

  containers[tasksList[index].status].querySelector(".tasks").innerHTML +=
    cartona;
  increaseCounters(tasksList[index]?.status);
}

function displayAllTasks() {
  for (var i = 0; i < tasksList.length; i++) {
    displayTask(i);
  }
}

function increaseCounters(status) {
  countersEl[status].innerHTML = +countersEl[status].innerHTML + 1;
}

function clearForm() {
  statusInput.value = "nextUp";
  categoryInput.value = "education";
  titleInput.value = "";
  descriptionInput.value = "";
}

function deleteTask(index) {
  tasksList.splice(index, 1);
  setTasksToLocal();
  resetContainers();
  resetCounters();
  displayAllTasks();
}

function resetContainers() {
  for (var key in containers) {
    containers[key].querySelector(".tasks").innerHTML = "";
  }
}

function resetCounters() {
  for (var key in countersEl) {
    countersEl[key].innerHTML = 0;
  }

  for (var key in counters) {
    counters[key] = 0;
  }
}

function getTaskInfo(index) {
  showModal();
  statusInput.value = tasksList[index].status;
  categoryInput.value = tasksList[index].category;
  titleInput.value = tasksList[index].title;
  descriptionInput.value = tasksList[index].description;

  addBtn.classList.replace("d-block", "d-none");
  updateBtn.classList.replace("d-none", "d-block");
  updatedIndex = index;
}

function updateTask(updatedIndex) {
  tasksList[updatedIndex].status = statusInput.value;
  tasksList[updatedIndex].category = categoryInput.value;
  tasksList[updatedIndex].title = titleInput.value;
  tasksList[updatedIndex].description = descriptionInput.value;

  resetContainers();
  resetCounters();
  displayAllTasks();

  addBtn.classList.replace("d-none", "d-block");
  updateBtn.classList.replace("d-block", "d-none");
  clearForm();
  hideModal();
}


function searchTasks() {
  resetContainers();
  resetCounters();
  const term = searchInput.value;
  for (var i = 0; i < tasksList.length; i++) {
    if (
      tasksList[i].title.toLowerCase().includes(term.toLowerCase()) ||
      tasksList[i].category.toLowerCase().includes(term.toLowerCase())
    ) {
      displayTask(i);
    }
  }
}



let colors = ["#00008B","#B22222","#8B008B"] ;
function  changeBackgroundColor(event,index){
    let  randomColors = colors[Math.trunc(Math.random()* colors.length)];
      tasksList[index].bgColor = randomColors;
      setTasksToLocal()
      event.target.closest(".task").style.backgroundColor =  randomColors;
      console.log(randomColors)
}
// & chnge bars function
function changeToBars(){
  gridBtn.classList.remove("active");
  barsBtn.classList.add("active");
   bars.classList.remove("row");

   for (let i=0 ;i<sections.length ;i++ ){
    sections[i].classList.remove("col-md-6","col-lg-4");
  
  }
    for (let j=0 ;j<tasks.length ;j++ ){
     
      tasks[j].setAttribute("data-view","bars");
    }

    
    setTasksToLocal()
  
  console.log(tasks)
} 
function changeToGrid(){
  gridBtn.classList.add("active");
  barsBtn.classList.remove("active");
   bars.classList.add("row");

   for (let i=0 ;i<sections.length ;i++ ){
    sections[i].classList.add("col-md-6","col-lg-4");
  
  }
    // for (let j=0 ;j<tasks.length ;j++ ){
     
    //   tasks[j].setAttribute("data-view","bars");
    // }

    
    setTasksToLocal()
  
  console.log(tasks)
} 


// & dark mode function
function  changeToLightMode(){

      root.style.setProperty("--main-black","white");
      root.style.setProperty("--sec-black","#eee");
      root.style.setProperty("--text-color","black");
       modeBtn.classList.add("d-none");
       darkMode.classList.remove("d-none")
}
function  changeToDarktMode(){
   
  root.style.setProperty("--main-black","#0d1117");
  root.style.setProperty("--sec-black","#161b22");
  root.style.setProperty("--text-color","#a5a6a7");

  modeBtn.classList.remove("d-none");
       darkMode.classList.add("d-none")
}

// ^  Events
 
newTaskBtn.addEventListener("click", showModal);

modalEl.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    hideModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.code === "Escape") {
    // console.log(event);
    hideModal();
  }
});

// !### Add a new task
addBtn.addEventListener("click", addTask);
updateBtn.addEventListener("click", function () {
  updateTask(updatedIndex);
});

// !### Add reel time search
searchInput.addEventListener("input", searchTasks);


barsBtn.addEventListener("click",changeToBars);
gridBtn.addEventListener("click",changeToGrid)

modeBtn.addEventListener("click", changeToLightMode);
darkMode.addEventListener("click",changeToDarktMode);

