import {TaskList, Task} from './lib.js';

const formEl = document.querySelector('#task-form');
const nameEl = document.querySelector('#task-name');
const listEl = document.querySelector('#task-list');

const taskList = new TaskList();

formEl.addEventListener('submit', function(evt) {
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
            ${item.name}
            <button data-id="up" class="btn btn-danger btn-sm float-right">&uarr;</button>
            <button data-id="down" class="btn btn-danger btn-sm float-right">&darr;</button>
            <button data-id="remove" class="btn btn-danger btn-sm float-right">Remove</button>
        `;
        // data-<name> (html data-attributes)

        const upEl = liEl.querySelector('[data-id=up]'); // внутри элемента li
        upEl.addEventListener('click', function(evt) {
            taskList.up(item);
            rebuildTree(container, list);
        });

        const downEl = liEl.querySelector('[data-id=down]'); // внутри элемента li
        downEl.addEventListener('click', function(evt) {
            taskList.down(item);
            rebuildTree(container, list);
        });

        const removeEl = liEl.querySelector('[data-id=remove]'); // внутри элемента li
        removeEl.addEventListener('click', function(evt) {
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