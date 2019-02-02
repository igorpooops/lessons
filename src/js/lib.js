export class Task {
    constructor(name) {
        this.name = name;
        this.done = false; // не сделано/сделано
    }
}

export class TaskList { // несмотря на то, что будет только один
    constructor(storage) {
        this.storage = storage;
    }

    get items(){
        return this.storage.items;
    }

    add(item) {
        this.storage.add(item); // в конец
    }

    remove(item) {
        this.storage.remove(item);
    }

    up(item) {
        this.storage.up(item);
    }

    down(item) {
        this.storage.down(item);
    }
}