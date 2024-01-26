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
  const projectData = localStorage.getItem(projectId);

  if (projectData) {
    const projectObj = JSON.parse(projectData);
    return projectObj;
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
