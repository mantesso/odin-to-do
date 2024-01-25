import { Project } from "./projects";
import { saveProject, getAllProjects, deleteProject } from "./storage";

let projectDialog = document.getElementById("projectDialog");
let projectForm = document.getElementById("projectForm");
const projectList = document.getElementById("projectList");
const projectTemplate = document.getElementById("projectTemplate");

let currentProjectId;

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let formContent = event.target.elements;
  let newProject = new Project(formContent.projectName.value);
  saveProject(newProject);
  projectForm.reset();
  projectDialog.close();
  displayProjects();
  console.log(newProject);
});

function displayProjects() {
  const projects = getAllProjects();
  console.log(projects);
  projectList.innerHTML = "";

  for (let project in projects) {
    const currentProject = JSON.parse(projects[project]);
    const projectName = currentProject.name;
    const projectId = project;

    const clone = document.importNode(projectTemplate.content, true);
    clone.querySelector("li").id = projectId;
    clone.querySelector("li").addEventListener("click", selectCurrentProject);
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

function selectCurrentProject(e) {
  const selectedProject = e.target.closest("li");
  currentProjectId = selectedProject.id;
  console.log(`current project = ${currentProjectId}`);

  let projects = projectList.children;
  for (let i = 0, n = projects.length; i < n; i++) {
    projects[i].classList.remove("bg-blue-100");
    projects[i].classList.add("bg-gray-100");
  }

  selectedProject.classList.remove("bg-gray-100");
  selectedProject.classList.add("bg-blue-100");
}

export { displayProjects };
