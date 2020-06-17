export default class Store {
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
    const json = localStorage.getItem("store");
    if (json) {
      const tmpStore = JSON.parse(json);

      if (tmpStore) {
        this.toDoItems = tmpStore.toDoItems;
        this.currentId = tmpStore.currentId;
      }
    }
  }
}
