function elementFactory(element, type, class1, class2, id, text) {
    const newElement = document.createElement(element);
    if (type) newElement.setAttribute('type', type);
    if (class1) newElement.classList.add(class1);
    if (class2) newElement.classList.add(class2);
    if (id) newElement.setAttribute("id", id);
    if (text) newElement.innerHTML = text;
    return newElement;
}

function BookObject(note, date, project) {
    this.note = note;
    this.date = date;
    this.project = project
    this.check = false;
}

export const list = {
    noteList: JSON.parse(localStorage.getItem('notes')) || [],
    projectList: JSON.parse(localStorage.getItem('projects')) || [],
    projectSelect: '',
    addItem: function() {
        const note = document.querySelector('#note');
        const date = document.querySelector('#date');
        if (list.projectSelect) {
            const newNote = new BookObject(note.value, date.value, list.projectSelect);
            this.noteList.push(newNote);
        } else {
            const newNote = new BookObject(note.value, date.value, false);
            this.noteList.push(newNote);
        }
        storage.setStorage();
    },
    addProject: function() {
        const project = document.querySelector('#project');
        this.projectList.push(project.value);
        storage.setStorage();
    },
    removeProjectAndNotes: function() {
        const projects = document.querySelectorAll('.project');
        projects.forEach((project, index) => {
            if (project.textContent === list.projectSelect) {
                this.projectList.splice(index, 1);
                this.noteList.forEach((item, i) => {
                    if (item.project === list.projectSelect) {
                        this.noteList.splice(i, 1);
                    }
                })
            }
        });
        storage.setStorage();
    },
    sortList: function() {
        this.noteList.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
    }
};

export const handleDOM = {
    renderList: function() {
        const items = document.querySelector('#items');
        items.innerHTML = '';
        list.sortList();
        if (list.projectSelect) {
            list.noteList.forEach((item, index) => {
                if (item.project === list.projectSelect) {
                    items.appendChild(elementFactory('div', '', 'item', '', `item${index}`, ''));
                    const checkbox = elementFactory('input', 'checkbox', '', '', '', '');
                    if (item.check === true) {
                        checkbox.checked = true;
                    }
                    items.lastChild.appendChild(checkbox);
                    items.lastChild.lastChild.addEventListener('click', () => {
                        list.noteList[index].check = !list.noteList[index].check;
                        storage.setStorage();
                    });
                    items.lastChild.appendChild(elementFactory('div', '', 'note', '', '', item.note));
                    items.lastChild.appendChild(elementFactory('div', '', '', '', '', ''));
                    items.lastChild.lastChild.appendChild(elementFactory('div', '', 'date', '', '', item.date));
                    items.lastChild.lastChild.appendChild(elementFactory('button', 'button', '', '', '', 'X'));
                    items.lastChild.lastChild.lastChild.addEventListener('click', () => {
                        const item = document.querySelector(`#item${index}`);
                        items.removeChild(item);
                        list.noteList.splice(index, 1);
                        storage.setStorage();
                    });
                }
            });
        } else {
            list.noteList.forEach((item, index) => {
                items.appendChild(elementFactory('div', '', 'item', '', `item${index}`, ''));
                const checkbox = elementFactory('input', 'checkbox', '', '', '', '');
                if (item.check === true) {
                    checkbox.checked = true;
                }
                items.lastChild.appendChild(checkbox);
                items.lastChild.lastChild.addEventListener('click', () => {
                    list.noteList[index].check = !list.noteList[index].check;
                    storage.setStorage();
                });
                items.lastChild.appendChild(elementFactory('div', '', 'note', '', '', item.note));
                items.lastChild.appendChild(elementFactory('div', '', '', '', '', ''));
                items.lastChild.lastChild.appendChild(elementFactory('div', '', 'date', '', '', item.date));
                items.lastChild.lastChild.appendChild(elementFactory('button', 'button', '', '', '', 'X'));
                items.lastChild.lastChild.lastChild.addEventListener('click', () => {
                    const item = document.querySelector(`#item${index}`);
                    items.removeChild(item);
                    list.noteList.splice(index, 1);
                    storage.setStorage();
                });
            });
        }
    },
    renderProjects: function() {
        const panel = document.querySelector('#projects-panel');
        panel.innerHTML = '';
        list.projectList.forEach((project, index) => {
            panel.appendChild(elementFactory('div', '', 'selection', 'project', `project${index}`, project));
            panel.lastChild.addEventListener('click', () => {
                const currentProject = document.querySelector(`#project${index}`);
                list.projectSelect = currentProject.textContent;
                this.renderList();
                const page = document.querySelector('#page');
                page.textContent = currentProject.textContent;
            });
        });
    }
};

const storage = {
    setStorage: function() {
        localStorage.clear();
        localStorage.setItem('notes', JSON.stringify(list.noteList));
        localStorage.setItem('projects', JSON.stringify(list.projectList));
    }
};