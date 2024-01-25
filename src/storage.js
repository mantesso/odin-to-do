function saveProject(project) {
  const projectSerialized = JSON.stringify({
    name: project.name,
    items: project.items,
  });

  localStorage.setItem(`project_${project.id}`, projectSerialized);
}

function getAllProjects() {
  let storage = { ...localStorage };
  delete storage.project_idCount;
  return storage;
}

function getProject(project_key) {
  let project = localStorage.getItem(project_key);
  return JSON.parse(project);
}

function deleteProject(id) {
  localStorage.removeItem(id);
}

export { saveProject, getAllProjects, deleteProject, getProject };
