function saveProject(project) {
  const itemsSerialized = JSON.stringify(project.items);
  localStorage.setItem(project.name, itemsSerialized);
}

export { saveProject };
