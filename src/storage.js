function saveItem(item) {
  const itemSerialized = JSON.stringify(item);
  localStorage.setItem(`item${item.id}`, itemSerialized);
}

function getItem(itemId) {
  const itemSerialized = localStorage.getItem(`item${itemId}`);
  return itemSerialized ? JSON.parse(itemSerialized) : null;
}

function saveProject(project) {
  const itemsSerialized = JSON.stringify(project.items);
  localStorage.setItem(project.name, itemsSerialized);
}

export { saveItem, getItem, saveProject };
