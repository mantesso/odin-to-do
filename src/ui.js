import { Project } from "./projects";
import {
  saveProject,
  getProject,
  getAllProjects,
  deleteProject,
} from "./storage";

let projectDialog = document.getElementById("projectDialog");
let projectForm = document.getElementById("projectForm");
const projectList = document.getElementById("projectList");
const projectTemplate = document.getElementById("projectTemplate");
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
  selectCurrentProject(`project_${newProject.id.toString()}`);
});

function displayProjects() {
  const projects = getAllProjects();
  // console.log(projects);
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
    console.log(`current project = ${currentProjectId}`);
    displayItems(currentProjectId); // Assuming this function is correctly set up to display items for the selected project
  }
}

function displayItems(projectId) {
  console.log(projectId);
  let selectedProject = getProject(projectId);
  let items = selectedProject.items;

  itemList.innerHTML = "";

  items.forEach((item) => {
    const clone = document.importNode(itemTemplate.content, true);
    clone.querySelector(".itemName").textContent = item.name;
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

export { displayProjects };
