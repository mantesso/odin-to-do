class Project {
  constructor(name) {
    this.name = name;
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
    item.project = this;
  }
}

export { Project };
