import Repo from "./repo";

console.log("this is code running");

let repo = new Repo();

let items = repo.getItems();
console.log(items.length + " items were loaded from storage");

function getId(element) {
    let ele = element;
    do {
      if (ele.dataset.id) {
        return [Number(ele.dataset.id), ele];
      }
      ele = ele.parentElement;
    } while (ele);
  }

  function displayText(boolean) {
    
    if (boolean === true) {
      const text = document.createElement('p');
      document.querySelector(".toDos").insertAdjacentElement('afterbegin', text);
      text.innerHTML = "Yeah, nothing to do today";
    } else {
      document.querySelector(".toDos p").remove();
    }
  } 

/*          At Start & End                              */

  window.onload = function(event) {
    let items = repo.getItems();
    items.forEach(i => addToDo(i));
    displayCurrentDate();
    items.length === -1 ? displayText(true): displayText(false);
  };

  window.addEventListener("unload", () => filterToDos("all"));
  

  function displayCurrentDate() {
    let now = new Date();
    let month = formattingDate(now.getUTCMonth() + 1);
    let day = formattingDate(now.getUTCDate());
    let dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayIdx = now.getDay();  
  
    document.getElementById("date").innerHTML = `${dayName[dayIdx]}, ${day}.${month}.`;
  }

  function formattingDate(number) {
    if (number < 10) {
      number = "0" + number;
      return number;
    }
    return number;
  }
  return number;
}

/*                   Events                               */

const toDoListDiv = document.querySelector(".toDos");

toDoListDiv.addEventListener("click", e => {
  if (toDoListDiv === e.target) return;

  let [id, selectedToDo] = getId(e.target);
  
    if (e.target.classList.contains("remove")) {
      removeToDo(id, selectedToDo);
      if (!e.target.parentElement) displayText(true);
    } else if (e.target.classList.contains("edit")) {
      editToDo(id, selectedToDo);
    } else if (e.target.classList.contains("check")) {
      repo.markItemAsCompleted(id);
      selectedToDo.classList.toggle("done");
    }
  
    e.preventDefault();
  });
  
  document.querySelector(".deleteAll").addEventListener("click", e => {
    removeToDos();
    displayText(true);
  });

  document.querySelector(".dropdown-menu").addEventListener("click", (e) => filterToDos(e));

  
  /*                 Functions // Event Handling                            */
  
  function addToDo(newItem) {
    const template = `<div class="toDo ${newItem.isCompleted ? 'done' : ''}" data-id="${newItem.id}">
        <button class="check">✔</button>
        <p>${newItem.text}</p>
        <input class="editField hide" />
        <date> ${new Date().toLocaleDateString()} </date>
        <button class="edit">Edit</button>
        <button class="remove">🗑</button>
      </div>`;
    
    document.querySelector(".toDos").innerHTML += template;
  }
  
  const newToDo = document.querySelector(".newToDo input[type='text']");
  document
    .querySelector("form")
    .addEventListener("submit", function(e) {

      if(document.querySelector("input[type='text']").value === "") {
          window.alert("The usefulness of a cup is in its emptiness (old chinese proverb). And the usefulness of a todo lies in its text! Please type something in the input field.");
      }
      else {
        if(document.querySelector(".toDos p")) displayText(false);
        let newItem = repo.createNewItem();
        newItem.text = newToDo.value;
        repo.addItem(newItem);
        addToDo(newItem);
        document.querySelector(".newToDo input[type='text']").value = "";
      }
     
      e.preventDefault();
    });
  
  function editToDo(id, ToDoItem) {
    const inputField = ToDoItem.querySelector("input");
    const toDoText = ToDoItem.querySelector("p");
    const editButton = ToDoItem.querySelector(".edit");
  
    if (editButton.innerHTML === "Edit") {
      editButton.innerHTML = "Update";
      toDoText.classList.add("hide");
      inputField.value = toDoText.innerHTML;
      inputField.classList.remove("hide");
    } else {
      let item = repo.getItemById(id);
      item.text = inputField.value;
      repo.updateItem(item);
      editButton.innerHTML = "Edit";
      inputField.classList.add("hide");
      toDoText.innerHTML = inputField.value;
      toDoText.classList.remove("hide");
    }

  document.querySelector(".toDos").innerHTML += template;
}

const newToDo = document.querySelector(".newToDo input[type='text']");
document.querySelector("form").addEventListener("submit", function(e) {
  let newItem = repo.createNewItem();
  newItem.text = newToDo.value;
  repo.addItem(newItem);
  addToDo(newItem);
  document.querySelector(".newToDo input[type='text']").value = "";
  e.preventDefault();
});

function editToDo(id, ToDoItem) {
  const inputField = ToDoItem.querySelector("input");
  const toDoText = ToDoItem.querySelector("p");
  const editButton = ToDoItem.querySelector(".edit");

  if (editButton.innerHTML === "Edit") {
    editButton.innerHTML = "Update";
    toDoText.classList.add("hide");
    inputField.value = toDoText.innerHTML;
    inputField.classList.remove("hide");
  } else {
    let item = repo.getItemById(id);
    item.text = inputField.value;
    repo.updateItem(item);
    editButton.innerHTML = "Edit";
    inputField.classList.add("hide");
    toDoText.innerHTML = inputField.value;
    toDoText.classList.remove("hide");
  }
  
  function removeToDo(id, ToDoItem) {
    repo.deleteItemById(id);
    ToDoItem.remove();
  }
  
  function removeToDos() {
    const toDos = document.querySelectorAll(".toDo");
    repo.clearAllItems();
    for (let toDo in toDos) {
      if (typeof toDos[toDo] === "object") {
        toDos[toDo].remove();
      }
    }
  }

  function filterToDos(e) {
    let allToDos = document.querySelectorAll(".toDo");
    
    if (e.target.classList.contains("all")) {
        for(let i=0; i<allToDos.length; i++) {
          allToDos[i].classList.remove("hide");
        }
    } else if (e.target.classList.contains("completed")) {
        for(let i=0; i<allToDos.length; i++) {
          if(allToDos[i].classList.contains("done")) {
            allToDos[i].classList.add("hide");
          }
          if(!allToDos[i].classList.contains("done") && allToDos[i].classList.contains("hide")) {
            allToDos[i].classList.remove("hide");
          }
        }
    } else if (e.target.classList.contains("uncompleted")) {
        for(let i=0; i<allToDos.length; i++) {
          if(!allToDos[i].classList.contains("done")) {
            allToDos[i].classList.add("hide");
          }
          if(allToDos[i].classList.contains("done") && allToDos[i].classList.contains("hide")) {
            allToDos[i].classList.remove("hide");
          }
        }
    }
  }

