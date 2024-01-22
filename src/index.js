import "./style.css";
import { Item } from "./items";
import { Project } from "./projects";
import { saveItem, getItem } from "./storage";

const item = new Item(
  "Buy paint",
  "Purchase white paint for bedroom",
  "2023-01-20",
  "High"
);
const itemSerialized = JSON.stringify(item);

console.log(itemSerialized);

let defaultProject = new Project("default");
defaultProject.addItem(item);

sessionStorage.setItem("item1", itemSerialized);
