import { Project } from "./projects";

function saveProject(project) {
  const projectSerialized = JSON.stringify({
    name: project.name,
    items: project.items,
  });

  localStorage.setItem(project.id, projectSerialized);
}

function getAllProjects() {
  let storage = { ...localStorage };
  delete storage.project_idCount;
  return storage;
}

function getProject(projectId) {
  console.log(`getProject projectId: ${projectId}`);
  const projectData = localStorage.getItem(projectId);

  if (projectData) {
    const projectObj = JSON.parse(projectData);
    return projectObj;
    // let project = new Project(projectObj.name);
    // project.items = projectObj.items;
    // project.id = projectId;
    // return project;
  }
  return null;
}

function deleteProject(projectId) {
  localStorage.removeItem(projectId);
}

function addItemToProject(projectId, item) {
  const project = getProject(projectId);
  if (project) {
    project.items.push(item);
    project.id = projectId;
    saveProject(project);
  } else {
    console.error("Project not found:", projectId);
  }
}

export {
  saveProject,
  getAllProjects,
  deleteProject,
  getProject,
  addItemToProject,
};
