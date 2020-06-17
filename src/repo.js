import Store from "./store";
import ToDoItem from "./todoitem";

export default class Repo {
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
    return this.getNextId;
  }

  addItem(item) {
    this.store.toDoItems.push(item);
    this.store.save();
  }

  deleteItemById(id) {
    this.store.toDoItems = this.store.toDoItems.filter((x) => x.Id !== id);
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
  }np
  
  clearAllItems() {
    this.store.toDoItems = [];
    this.store.save();
  }

  createNewItem() {
    return new ToDoItem(this.store.getNextId());
  }
}
