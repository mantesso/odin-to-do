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

function deleteProject(id) {
  localStorage.removeItem(id);
}

export { saveProject, getAllProjects, deleteProject };
