class Todos {
  constructor() {
    this.todos = [];
  }

  list() {
    return [...this.todos];
  }

  add(title) {
    let todo = {
      title: title,
      completed: false,
    }

    this.todos.push(todo);
  }

  complete(title) {
    if (this.todos.length === 0) {
      throw new Error("You have no TODOs stored. Why don't you add one first?");
    }

    let todoFound = false
    this.todos.forEach((todo) => {
      if (todo.title === title) {
        todo.completed = true;
        todoFound = true;
        return;
      }
    });

    if (!todoFound) {
      throw new Error(`No TODO was found with the title: "${title}"`);
    }
  }
}

module.exports = Todos;
