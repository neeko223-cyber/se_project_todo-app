import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleTodoChange() {
  const completedCount = initialTodos.filter(todo => todo.completed).length;
  todoCounter.updateCompleted(completedCount);
}

function handleTodoDelete() {
  const completedCount = initialTodos.filter(todo => todo.completed).length;
  const totalCount = initialTodos.length;
  todoCounter.updateCompleted(completedCount);
  todoCounter.updateTotal(totalCount);
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleTodoChange, handleTodoDelete);
  const todoElement = todo.getView();
  return todoElement;
};

const todoSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    todoSection.addItem(todoElement);
  },
  containerSelector: ".todos__list"
});

todoSection.renderItems();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputvalues) => {
    const newTodo = {
      id: uuidv4(),
      name: inputvalues.name,
      description: inputvalues.description,
      date: inputvalues.date,
      priority: inputvalues.priority,
      completed: false
    };

    const todoElement = generateTodo(newTodo);
    todoSection.addItem(todoElement);
  }
});
addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const handleFormSubmit = (formData) => {
  const newTodo = {
    id: uuidv4(),
    name: formData.name,
    description: formData.description,
    date: formData.date,
    priority: formData.priority,
    completed: false
  };
  const todoElement = generateTodo(newTodo);
  todoSection.addItem(todoElement);
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoCloseBtn.addEventListener("click", () => {
  addTodoPopup.close();
});


const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
