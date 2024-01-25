import { Project } from "./projects";
import { saveProject, getAllProjects, deleteProject } from "./storage";

let projectDialog = document.getElementById("projectDialog");
let projectForm = document.getElementById("projectForm");
const projectList = document.getElementById("projectList");
const projectTemplate = document.getElementById("projectTemplate");

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
    console.log("project:");
    console.log(projects[project]);
    let currentProject = JSON.parse(projects[project]);
    const projectName = currentProject.name;
    const projectId = project;
    const clone = document.importNode(projectTemplate.content, true);
    clone.querySelector("li").id = projectId;
    clone.querySelector("p").textContent = projectName;
    clone
      .querySelector("button")
      .addEventListener("click", removeProjectFromList);
    projectList.appendChild(clone);
  }
}

function removeProjectFromList(e) {
  console.log(e.target.parentNode.parentNode.id);
}

export { displayProjects };
