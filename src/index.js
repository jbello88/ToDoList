import Repo from './repo';



console.log("this is code running");

let repo = new Repo();

let items = repo.getItems();
console.log(items.length + " items were loaded from storage")


function getId(element) {
    let ele = element;
    do {
      if (ele.dataset.id) {
        return [Number(ele.dataset.id), ele];
      }
      ele = ele.parentElement;
    } while (ele);
  }



/*          At Start & End                              */

window.onload = function(event) {
    let items = repo.getItems();
    items.forEach(i => addToDo(i));
    displayCurrentDate();
  };
  

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


  /*                   Events                               */
  
  document.querySelector(".toDos").addEventListener("click", e => {
    let [id, selectedToDo] = getId(e.target);  

    if (e.target.classList.contains("remove")) {
      removeToDo(id, selectedToDo);
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
  });
  
  /*                 Functions // Event Handling                            */
  
  function addToDo(newItem) {
    const template = `<div class="toDo ${newItem.isCompleted ? 'done' : ''}" data-id="${newItem.id}">
        <button class="check">Check</button>
        <p>${newItem.text}</p>
        <input class="editField hide" />
        <date> ${new Date().toLocaleTimeString()} </date>
        <button class="edit">Edit</button>
        <button class="remove">Remove</button>
      </div>`;
  
    document.querySelector(".toDos").innerHTML += template;
  }
  
  const newToDo = document.querySelector(".newToDo input[type='text']");
  document
    .querySelector("form")
    .addEventListener("submit", function(e) {
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

  }
  
  function removeToDo(id, ToDoItem) {
      console.log(id);
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
  
  /*             wo platzieren?                              */
  /*
  if (!document.querySelector(".toDo")) {
    document.querySelector(
      ".toDos"
    ).innerHTML = `<p class="noToDos">"Yeah, nothing to do today"</p>`;
  } else {
    document.querySelector(".deleteAll").classList.remove("hide");
  }*/
  




