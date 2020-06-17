export default class ToDoItem {
  constructor(id) {
    this.id = id;
    this.createdOn = new Date();
    this.text = "";
    this.isCompleted = false;
  }
}
