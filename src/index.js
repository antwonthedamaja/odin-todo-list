import './style.css';
import {list, handleDOM} from './list.js';

// Modals

const modal = document.querySelector('#modal');
const openModal = document.querySelector("#add-item");
const closeModal = document.querySelector("#close-modal");

openModal.addEventListener('click', () => modal.showModal());
closeModal.addEventListener('click', () => modal.close());

const newProject = document.querySelector("#new-project");
const projectModal = document.querySelector("#project-modal");
const closeProjectModal = document.querySelector("#close-project-modal");

newProject.addEventListener('click', () => {
    projectModal.showModal();
});

closeProjectModal.addEventListener('click', () => {
    projectModal.close();
});

// DOM manipulation

const submit = document.querySelector('#submit');

submit.addEventListener('click', () => {
    list.addItem();
    handleDOM.renderList();
    modal.close()
});

const projectSubmit = document.querySelector('#project-submit');

projectSubmit.addEventListener('click', () => {
    list.addProject();
    handleDOM.renderProjects();
    projectModal.close();
});

const home = document.querySelector('#home');

home.addEventListener('click', () => {
    list.projectSelect = '';
    handleDOM.renderList();
    const page = document.querySelector('#page');
    page.textContent = 'Home';
});

const deleteProject = document.querySelector('#delete-project');

deleteProject.addEventListener('click', () => {
    if (!list.projectSelect) {
        alert('Please select a project first');
    } else if (confirm('Are you sure you want to delete this project and all associated notes?') === true) {
        list.removeProjectAndNotes();
        const page = document.querySelector('#page');
        page.textContent = 'Home';
        list.projectSelect = '';
        handleDOM.renderProjects();
        handleDOM.renderList();
    }
});

// for local storage

handleDOM.renderProjects();
handleDOM.renderList();