function saveProject(project) {
  const projectSerialized = JSON.stringify({
    name: project.name,
    items: project.items,
  });

  localStorage.setItem(project.id, projectSerialized);
}

function getAllProjects() {
  return { ...localStorage };
}

function deleteProject(id) {
  localStorage.removeItem(id);
}

export { saveProject, getAllProjects, deleteProject };
