class Project {
  static get idCount() {
    // Retrieve the current idCount from localStorage, defaulting to 0 if not found
    const storedCount = localStorage.getItem("project_idCount");
    return storedCount ? parseInt(storedCount, 10) : 0;
  }

  static set idCount(newValue) {
    // Update the idCount in localStorage
    localStorage.setItem("project_idCount", newValue.toString());
  }

  constructor(name) {
    this.id = Project.idCount + 1; // Assign an ID before incrementing idCount
    Project.idCount = this.id; // Update the static idCount to match
    this.name = name;
    this.items = [];
  }

  // addItem(item) {
  //   this.items.push(item);
  // }

  editItem(itemId, updatedData) {
    const itemIndex = this.items.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      // Update item properties
      this.items[itemIndex] = { ...this.items[itemIndex], ...updatedData };
      return true; // Return true if the item was successfully edited
    }
    return false; // Item not found
  }
}

export { Project };
