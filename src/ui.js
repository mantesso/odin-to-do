import { Project } from "./projects";
import { Item } from "./items";
import {
  saveProject,
  getProject,
  getAllProjects,
  deleteProject,
  addItemToProject,
} from "./storage";

const projectDialog = document.getElementById("projectDialog");
const projectForm = document.getElementById("projectForm");
const projectList = document.getElementById("projectList");
const projectTemplate = document.getElementById("projectTemplate");

const itemDialog = document.getElementById("itemDialog");
const itemForm = document.getElementById("itemForm");
const itemList = document.getElementById("itemList");
const itemTemplate = document.getElementById("itemTemplate");

let currentProjectId;

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let formContent = event.target.elements;
  let newProject = new Project(formContent.projectName.value);
  saveProject(newProject);
  projectForm.reset();
  projectDialog.close();
  displayProjects();
  selectCurrentProject(newProject.id);
});

itemForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let formContent = event.target.elements;
  let newItem = new Item({
    title: formContent.itemTitle.value,
    description: formContent.itemDescription.value,
  });

  addItemToProject(currentProjectId, newItem);
  itemForm.reset();
  itemDialog.close();
  selectCurrentProject(currentProjectId);
  displayItems(currentProjectId);
});

function displayProjects() {
  const projects = getAllProjects();
  projectList.innerHTML = "";

  for (let project in projects) {
    const currentProject = JSON.parse(projects[project]);
    const projectName = currentProject.name;
    const projectId = project;

    const clone = document.importNode(projectTemplate.content, true);
    clone.querySelector("li").id = projectId;
    clone.querySelector("li").addEventListener("click", function (e) {
      const projectId = e.target.closest("li").id;
      selectCurrentProject(projectId);
    });
    clone.querySelector("p").textContent = projectName;
    clone
      .querySelector("button")
      .addEventListener("click", removeProjectFromList);
    projectList.appendChild(clone);
  }
}

function removeProjectFromList(e) {
  const projectId = e.target.parentNode.parentNode.id;
  deleteProject(projectId);
  displayProjects();
}

function selectCurrentProject(projectId) {
  // Reset the styling for all project list items
  let projects = projectList.children;
  for (let i = 0; i < projects.length; i++) {
    projects[i].classList.remove("bg-blue-100");
    projects[i].classList.add("bg-gray-100");
  }

  // Select the project list item by ID and update its styling
  const selectedProject = document.getElementById(projectId);
  if (selectedProject) {
    selectedProject.classList.remove("bg-gray-100");
    selectedProject.classList.add("bg-blue-100");
    currentProjectId = projectId;
    displayItems(currentProjectId);
  }
}

function displayItems(projectId) {
  let selectedProject = getProject(projectId); // Just use projectId here

  if (!selectedProject) {
    console.error(`Project with ID ${projectId} not found.`);
    return;
  }

  let items = selectedProject.items;
  itemList.innerHTML = "";

  if (items) {
    items.forEach((item) => {
      const clone = document.importNode(itemTemplate.content, true);
      clone.querySelector(".itemTitle").textContent = item.title;
      clone.querySelector(".itemDescription").textContent = item.description;
      clone.querySelector(".itemDate").textContent = item.dueDate;

      // clone.querySelector("li").addEventListener("click", selectCurrentProject);
      // clone.querySelector("p").textContent = projectName;
      // clone
      // .querySelector("button")
      // .addEventListener("click", removeProjectFromList);
      itemList.appendChild(clone);
    });
  }
}

export { displayProjects };
