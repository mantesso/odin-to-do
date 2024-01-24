function saveProject(project) {
  const projectSerialized = JSON.stringify({
    name: project.name,
    items: project.items,
  });

  localStorage.setItem(project.id, projectSerialized);
}

// returns an array with all projects name's saved in localStorage
function getAllProjects() {
  return localStorage;
}

function deleteProject(name) {
  localStorage.removeItem(name);
}

export { saveProject, getAllProjects, deleteProject };
