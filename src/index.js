import "./style.css";
import { Item } from "./items";
import { Project } from "./projects";
import { saveItem, getItem } from "./storage";

const item = new Item({
  title: "Buy paint",
  description: "Purchase white paint for the living room",
  dueDate: "2024-01-20",
  priority: "High",
});

let defaultProject = new Project("default");
defaultProject.addItem(item);

// console.log(item);
console.log(defaultProject);
const itemSerialized = JSON.stringify(item);
// console.log(itemSerialized);
saveItem(item);

let retrievedFromStorage = getItem("1");
retrievedFromStorage.title = "edited title";

console.log(retrievedFromStorage);
saveItem(retrievedFromStorage);
