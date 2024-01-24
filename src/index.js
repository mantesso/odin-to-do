import "./style.css";
import { Item } from "./items";
import { Project } from "./projects";
import { saveProject } from "./storage";
import { addEventListeners, displayProjects } from "./ui";

addEventListeners();
displayProjects();

const item = new Item({
  title: "Buy paint",
  description: "Purchase white paint for the living room",
  dueDate: "2024-01-20",
  priority: "High",
});

const bbb = new Item({
  title: "Fix car",
  description: "fix motor",
  dueDate: "2024-01-24",
  priority: "High",
});

let defaultProject = new Project("default");
defaultProject.addItem(item);
defaultProject.addItem(bbb);

defaultProject.editItem(1, { title: "edited title" });
saveProject(defaultProject);

const ccc = new Item({
  title: "Fix floor",
  description: "fix motor",
  dueDate: "2024-01-24",
  priority: "High",
});

defaultProject.addItem(ccc);
saveProject(defaultProject);

// // console.log(item);
// console.log(defaultProject);
// const itemSerialized = JSON.stringify(item);
// // console.log(itemSerialized);
// saveItem(item);

// let retrievedFromStorage = getItem("1");
// retrievedFromStorage.title = "edited title";

// console.log(retrievedFromStorage);
// saveItem(retrievedFromStorage);
