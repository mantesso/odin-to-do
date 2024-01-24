class Project {
  constructor(name) {
    this.name = name;
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

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
