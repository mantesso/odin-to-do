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

function removeItemFromProject(projectId, itemId) {
  const project = getProject(projectId);
  if (project) {
    const originalLength = project.items.length;
    project.items = project.items.filter((item) => item.id != itemId);

    // handle the case where the item isn't found
    if (project.items.length === originalLength) {
      console.log("Item not found in project:", itemId);
    }
    project.id = projectId;
    saveProject(project);
  } else {
    console.error("Project not found:", projectId);
  }
}

function getItemFromProject(projectId, itemId) {
  const project = getProject(projectId);
  if (project) {
    let item = project.items.filter((item) => item.id == itemId);
    return item[0];
  } else {
    console.error("Project not found:", projectId);
  }
}

function updateItemInProject(projectId, itemId, updatedItem) {
  let project = getProject(projectId);
  if (project) {
    let itemIndex = project.items.findIndex((item) => item.id == itemId);
    if (itemIndex > -1) {
      project.items[itemIndex] = {
        ...project.items[itemIndex],
        ...updatedItem,
      };
      project.id = projectId;
      saveProject(project);
    }
  }
}

function toggleItemComplete(projectId, itemId) {
  let project = getProject(projectId);
  if (project) {
    let itemIndex = project.items.findIndex((item) => item.id == itemId);
    if (itemIndex > -1) {
      project.items[itemIndex].completed = !project.items[itemIndex].completed;
    }
    project.id = projectId;
    saveProject(project);
  }
}

export {
  saveProject,
  getAllProjects,
  deleteProject,
  getProject,
  addItemToProject,
  removeItemFromProject,
  getItemFromProject,
  updateItemInProject,
  toggleItemComplete,
};
