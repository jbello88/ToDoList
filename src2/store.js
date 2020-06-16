export default class Store {
  constructor(items = []) {
    this.toDoItems = items;
    this.currentId = 1000;

    if (length.items === 0) {
      load();
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
    if (json) {
      var tmpStore = JSON.parse(json);

      if (tmpStore) {
        this.toDoItems = tmpStore.toDoItems;
        this.currentId = tmpStore.currentId;
      }
    }
  }
}
