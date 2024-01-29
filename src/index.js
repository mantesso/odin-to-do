import "./style.css";
import { Item } from "./items";
import { Project } from "./projects";
import { saveProject, addItemToProject } from "./storage";
import { displayProjects } from "./ui";

if (window.localStorage.length === 0) {
  const item1 = new Item({
    title: "Buy paint",
    description: "Purchase white paint for the living room",
    dueDate: "2024-01-20",
    priority: "High",
  });

  const item2 = new Item({
    title: "Print invites",
    description: "Print and send invitations",
    dueDate: "2024-01-25",
    priority: "Low",
  });

  let defaultProject = new Project("Example");

  saveProject(defaultProject);
  addItemToProject(defaultProject.id, item1);
  addItemToProject(defaultProject.id, item2);
}

displayProjects();
