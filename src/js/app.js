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

        const removeEl = liEl.querySelector('[data-id=remove]'); // внутри элемента li
        removeEl.addEventListener('click', function(evt) {
           taskList.remove(item);
           rebuildTree(container, list);
        });

        container.appendChild(liEl);
    }
}