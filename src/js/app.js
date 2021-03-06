import {TaskList, Task} from './lib.js';
import {TaskLocalStorage} from "./storage.js";


const formEl = document.querySelector('#task-form');
const nameEl = document.querySelector('#task-name');
const listEl = document.querySelector('#task-list');

const taskList = new TaskList(new TaskLocalStorage());//создание таст-листа
rebuildTree(listEl,taskList);//Перестройка дерева документа

nameEl.addEventListener('input',(evt)=>{
    evt.preventDefault();
    console.log(evt);
   if(nameEl.value === ''){
       nameEl.classList.add('error');
   }else{
       nameEl.classList.remove('error');
   }
});

nameEl.addEventListener('contextmenu',(evt)=>{
   evt.preventDefault();
});


formEl.addEventListener('submit', (evt) => {
    // есть на некоторые события default'ое поведение
    // click на ссылку переход
    // при отправке формы - "страница перезагружает" (форма отправляется на сервер)
    evt.preventDefault(); // просим браузер, не делать то, что он делает по умолчанию

    const name = nameEl.value;
    // TODO: валидация

    const task = new Task(name);
    taskList.add(task);

    nameEl.value = ''; // очистка формы

    rebuildTree(listEl, taskList);
});

// memory + DOM
// rebuild tree -> memory

function rebuildTree(container, list) {
    container.innerHTML = ''; // вырезать всех child'ов
    for (const item of list.items) {
        const liEl = document.createElement('li');
        liEl.className = 'list-group-item';

        liEl.innerHTML = `
            <span data-id="text">${item.name}</span>
            <button data-id="up" class="btn btn-danger btn-sm float-right">&uarr;</button>
            <button data-id="down" class="btn btn-danger btn-sm float-right">&darr;</button>
            <button data-id="remove" class="btn btn-danger btn-sm float-right">Remove</button>
        `;
        // data-<name> (html data-attributes)

        const textEl = liEl.querySelector('[data-id=text]');
        if (item.done) {
            textEl.classList.add('task-done');
        }
        textEl.addEventListener('click', (evt) =>{
           item.done = !item.done;
           rebuildTree(container, list);
        });

        const upEl = liEl.querySelector('[data-id=up]'); // внутри элемента li
        upEl.addEventListener('click', (evt) => {
            taskList.up(item);
            rebuildTree(container, list);
        });

        const downEl = liEl.querySelector('[data-id=down]'); // внутри элемента li
        downEl.addEventListener('click', (evt) => {
            taskList.down(item);
            rebuildTree(container, list);
        });

        const removeEl = liEl.querySelector('[data-id=remove]'); // внутри элемента li
        removeEl.addEventListener('click', (evt) => {
            console.log(evt);
           taskList.remove(item);
           rebuildTree(container, list);
        });

        container.appendChild(liEl);
    }

    // const children = Array.from(container.children);

    if (list.items.length !== 0) {
        const first = container.firstElementChild;
        // classList - работа со списком классов, .add - добавление класса
        first.querySelector('[data-id=up]').classList.add('invisible');
        // const upEl = first.querySelector('[data-id=up]');
        // const clsList = upEl.classList;
        // clsList.add('invisible');

        const last = container.lastElementChild;
        last.querySelector('[data-id=down]').classList.add('invisible');
    }
}