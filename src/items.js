class Item {
  constructor(
    title,
    description,
    dueDate,
    priority,
    project = null,
    completed = false
  ) {
    this.id = ++this.constructor.idCount;
    this.createdAt = new Date();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
  }

  static idCount = 0;
}

export { Item };
