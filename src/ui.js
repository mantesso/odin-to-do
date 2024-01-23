import { Project } from "./projects";
import { saveProject } from "./storage";

function addEventListeners() {
  let projectDialog = document.getElementById("projectDialog");
  let projectForm = document.getElementById("projectForm");
  let projectList = document.getElementById("projectList");
}

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let formContent = event.target.elements;
  let newProject = new Project(formContent.projectName.value);
  saveProject(newProject);
  projectForm.reset();
  projectDialog.close();
  // displayBooks();
  console.log(newProject);
});

function displayProjects() {
  projectList.innerHTML = "";
}

export { addEventListeners, displayProjects };
