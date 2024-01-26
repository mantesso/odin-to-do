class Item {
  static idCount = 0;
  constructor({ title, description, dueDate, priority, completed = false }) {
    this.id = ++this.constructor.idCount;
    this.createdAt = new Date();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
  }
}

export { Item };
