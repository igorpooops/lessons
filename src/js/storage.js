export class TaskLocalStorage {
    constructor(){
        const savedItems = JSON.parse(localStorage.getItem('tasks'));
        if(savedItems !==null){
            this.items=savedItems;
        }else{
            this.items=[];
        }
    }
    add(item) {
        this.items.push(item); // в конец
        this.save();
    }
    remove(item) {
        const index = this.items.indexOf(item);

        if (index !== -1) {
            this.items.splice(index, 1);
            this.save();
        }
    }
    up(item) {

        const index = this.items.indexOf(item);

        if (index !== -1) {
            [this.items[index],this.items[index-1]]=
                [this.items[index-1],this.items[index]];
            this.save();
        }
    }
    down(item) {
        const index = this.items.indexOf(item);

        if (index !== -1) {
            [this.items[index],this.items[index+1]]=
                [this.items[index+1],this.items[index]];
            this.save();
        }
    }
    save(){
        localStorage.setItem('tasks',JSON.stringify(this.items))
    }
}

