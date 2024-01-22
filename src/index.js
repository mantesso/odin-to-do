import "./style.css";
import { Item } from "./items";
import { Project } from "./projects";

let item = new Item("titulo", "descrip", "datexxx", 1);
let defaultProject = new Project("default");
defaultProject.addItem(item);
console.log(item);
