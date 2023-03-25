import './style.css';
import {list} from './list.js';
import {handleDOM} from './list.js';

const modal = document.querySelector('#modal');
const openModal = document.querySelector("#add-item");
const closeModal = document.querySelector("#close-modal");

openModal.addEventListener('click', () => modal.showModal());
closeModal.addEventListener('click', () => modal.close());

const submit = document.querySelector('#submit');

submit.addEventListener('click', () => {
    list.addItem();
    handleDOM.renderList();
    modal.close()
});

