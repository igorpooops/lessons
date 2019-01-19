export class Task {
    constructor(name) {
        this.name = name;
        this.done = false; // не сделано/сделано
    }
}

export class TaskList { // несмотря на то, что будет только один
    constructor() {
        this.items = [];
    }

    add(item) {
        this.items.push(item); // в конец
    }

    remove() {
        // TODO:
    }
}