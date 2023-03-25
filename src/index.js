import './style.css';
import {list} from './list.js';

const modal = document.querySelector('#modal');
const openModal = document.querySelector("#add-item");
const closeModal = document.querySelector("#close-modal");

openModal.addEventListener('click', () => modal.showModal());
closeModal.addEventListener('click', () => modal.close());

const submit = document.querySelector('#submit');

submit.addEventListener('click', () => {
    
})