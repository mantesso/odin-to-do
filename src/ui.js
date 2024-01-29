import { Project } from "./projects";
import { Item } from "./items";
import {
  saveProject,
  getProject,
  getAllProjects,
  deleteProject,
  addItemToProject,
  removeItemFromProject,
  getItemFromProject,
  updateItemInProject,
  toggleItemComplete,
} from "./storage";

const addProject = document.getElementById("addProject");
const projectDialog = document.getElementById("projectDialog");
const projectForm = document.getElementById("projectForm");
const projectList = document.getElementById("projectList");
const projectTemplate = document.getElementById("projectTemplate");

const addItem = document.getElementById("addItem");
const itemDialog = document.getElementById("itemDialog");
const itemForm = document.getElementById("itemForm");
const itemList = document.getElementById("itemList");
const itemTemplate = document.getElementById("itemTemplate");

addProject.addEventListener("click", openProjectForm);
addItem.addEventListener("click", openItemForm);

// variables to track editing of an item
let isEditing = false;
let editingItemId = null;

function openProjectForm() {
  projectDialog.showModal();
}

function openItemForm() {
  if (!currentProjectId) {
    alert("Please select a project.");
  } else {
    itemDialog.showModal();
  }
}

let currentProjectId;

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let formContent = event.target.elements;
  let newProject = new Project(formContent.projectName.value);
  saveProject(newProject);
  projectForm.reset();
  projectDialog.close();
  displayProjects();
  selectCurrentProject(newProject.id);
});

itemForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let formContent = event.target.elements;

  if (isEditing) {
    // Update existing item
    let updatedItem = {
      title: formContent.itemTitle.value,
      description: formContent.itemDescription.value,
      priority: formContent.itemPriority.value,
      dueDate: formContent.itemDueDate.value,
    };
    updateItemInProject(currentProjectId, editingItemId, updatedItem);
    isEditing = false;
    editingItemId = null;
  } else {
    // Add new item
    let newItem = new Item({
      title: formContent.itemTitle.value,
      description: formContent.itemDescription.value,
      priority: formContent.itemPriority.value,
      dueDate: formContent.itemDueDate.value,
    });
    addItemToProject(currentProjectId, newItem);
  }

  itemForm.reset();
  itemDialog.close();
  selectCurrentProject(currentProjectId);
  displayItems(currentProjectId);
});

function displayProjects() {
  const projects = getAllProjects();
  projectList.innerHTML = "";

  for (let project in projects) {
    const currentProject = JSON.parse(projects[project]);
    const projectName = currentProject.name;
    const projectId = project;

    const clone = document.importNode(projectTemplate.content, true);
    clone.querySelector("li").id = projectId;
    clone.querySelector("li").addEventListener("click", function (e) {
      const projectId = e.target.closest("li").id;
      selectCurrentProject(projectId);
    });
    clone.querySelector("p").textContent = projectName;
    clone
      .querySelector("button")
      .addEventListener("click", removeProjectFromList);
    projectList.appendChild(clone);
  }
}

function removeProjectFromList(e) {
  const projectId = e.target.parentNode.parentNode.id;
  deleteProject(projectId);
  displayProjects();
}

function removeItemFromProjectList(e) {
  const itemId = e.target.parentNode.parentNode.id;
  let parts = itemId.split("_"); //remove 'item_' from itemId string
  let parsedItemId = parts[1];

  const projectId = currentProjectId;
  removeItemFromProject(projectId, parsedItemId);
  displayItems(projectId);
}

function editItem(e) {
  isEditing = true;
  const itemId = e.target.parentNode.parentNode.id;
  let parts = itemId.split("_"); // Remove 'item_' from itemId string
  editingItemId = parts[1];

  const item = getItemFromProject(currentProjectId, editingItemId);
  document.querySelector("#itemTitle").value = item.title;
  document.querySelector("#itemDescription").value = item.description;
  document.querySelector("#itemPriority").value = item.priority;
  document.querySelector("#itemDueDate").value = item.dueDate;

  itemDialog.showModal();
}

function selectCurrentProject(projectId) {
  // Reset the styling for all project list items
  let projects = projectList.children;
  for (let i = 0; i < projects.length; i++) {
    projects[i].classList.remove("bg-blue-100");
    projects[i].classList.add("bg-gray-100");
  }

  // Select the project list item by ID and update its styling
  const selectedProject = document.getElementById(projectId);
  if (selectedProject) {
    selectedProject.classList.remove("bg-gray-100");
    selectedProject.classList.add("bg-blue-100");
    currentProjectId = projectId;
    displayItems(currentProjectId);
  }
}

function clearItems() {
  itemList.innerHTML = "";
}

function displayItems(projectId) {
  let selectedProject = getProject(projectId);

  if (!selectedProject) {
    console.error(`Project with ID ${projectId} not found.`);
    return;
  }

  let items = selectedProject.items;
  clearItems();

  if (items) {
    items.forEach((item) => {
      const clone = document.importNode(itemTemplate.content, true);
      clone.querySelector("li").id = `item_${item.id}`;
      clone.querySelector(".itemTitle").textContent = item.title;
      clone.querySelector(".itemDescription").textContent = item.description;
      if (item.dueDate) {
        clone.querySelector(
          ".itemDueDate"
        ).textContent = `Due date: ${item.dueDate}`;
      }
      if (item.priority) {
        clone.querySelector(
          ".itemPriority"
        ).textContent = `Priority: ${item.priority}`;
      }

      let isComplete = clone.querySelector(".itemComplete");
      isComplete.addEventListener("change", toggleItemCompletedInList);
      isComplete.checked = item.completed;

      clone
        .querySelector(".deleteItemBtn")
        .addEventListener("click", removeItemFromProjectList);
      clone.querySelector(".editItemBtn").addEventListener("click", editItem);
      itemList.appendChild(clone);
    });
  }
}

function toggleItemCompletedInList(e) {
  const itemId = e.target.parentNode.parentNode.id;
  let parts = itemId.split("_"); //remove 'item_' from itemId string
  let parsedItemId = parts[1];

  toggleItemComplete(currentProjectId, parsedItemId);
  displayItems(currentProjectId);
}

export { displayProjects };
