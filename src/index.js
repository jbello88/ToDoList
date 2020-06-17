class ToDoItem {
  constructor(id) {
    this.id = id;
    this.createdOn = new Date();
    this.text = "";
    this.isCompleted = false;
  }
}

class Store {
  constructor(items = []) {
    this.toDoItems = items;
    this.currentId = 1000;
    if (items.length === 0) {
      this.load();
    }
  }

  getNextId() {
    this.currentId++;
    return this.currentId;
  }

  save() {
    localStorage.setItem("store", JSON.stringify(this));
  }

  load() {
    var json = localStorage.getItem("store");
    if (json.length > 2) {
      var tmpStore = JSON.parse(json);

      if (tmpStore) {
        this.toDoItems = tmpStore.toDoItems;
        this.currentId = tmpStore.currentId;
      }
    }
  }
}

class Repo {
  constructor(store = new Store([])) {
    this.store = store;
  }

  getItems() {
    return this.store.toDoItems;
  }

  getItemById(id) {
    var filteredList = this.store.toDoItems.filter((x) => x.id === id);
    if (filteredList.length >= 1) return filteredList[0];
    return null;
  }

  getNextId() {
    return this.store.getNextId;
  }

  addItem(item) {
    this.store.toDoItems.push(item);
    this.store.save();
  }

  deleteItemById(id) {
    this.store.toDoItems = this.store.toDoItems.filter((x) => x.id != id);
    this.store.save();
  }

  updateItem(item) {
    this.store.toDoItems = this.store.toDoItems.map((x) =>
      x.Id !== item.Id ? x : item
    );
    this.store.save();
  }

  markItemAsCompleted(id) {
    this.store.toDoItems = this.store.toDoItems.map((x) =>
      x.id === id ? { ...x, IsCompleted: true } : x
    );
    this.store.save();
  }

  clearAllItems() {
    this.store.toDoItems = [];
    this.store.save;
  }

  createNewItem() {
    let newId = this.store.getNextId();
    console.log("NewId: " + newId);
    return new ToDoItem(newId);
  }
}

console.log("we are up and running");
let repo = new Repo(new Store());

let items = repo.getItems();
console.log(items.length + " items loaded from local storage");
