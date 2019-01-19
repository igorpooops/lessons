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

    // создали элемент
    const liEl = document.createElement('li');
    // подставили textContent
    liEl.textContent = task.name;
    // console.log(liEl.parentElement);
    // пока у элемента нет родителя, он нигде не отображается
    liEl.className = 'list-group-item';
    listEl.appendChild(liEl);
});