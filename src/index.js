import Repo from './repo';



console.log("this is code running");

let repo = new Repo();

let items = repo.getItems();
console.log(items.length + " items were loaded from storage")

// uncoment the following block to generate new items
//  let item = repo.createNewItem();
// item.text = 'This is a test #' + item.id;
// repo.addItem(item);




