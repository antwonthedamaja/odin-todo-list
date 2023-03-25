function elementFactory(element, type, class1, class2, id, text) {
    const newElement = document.createElement(element);
    if (type) newElement.setAttribute('type', type);
    if (class1) newElement.classList.add(class1);
    if (class2) newElement.classList.add(class2);
    if (id) newElement.setAttribute("id", id);
    if (text) newElement.innerHTML = text;
    return newElement;
}

export const list = {
    noteList: [],
    projectList: [],
    BookObject: function(note, date) {
        this.note = note;
        this.date = date;
        this.check = false;
    },
    addItem: function() {
        const note = document.querySelector('#note');
        const date = document.querySelector('#date');
        const newNote = new this.BookObject(note.value, date.value);
        this.noteList.push(newNote); 
    },
    addProject: function() {
        const project = document.querySelector('#project');
        this.projectList.push(project.value);
    },
    log: function() {
        console.table(this.noteList);
    }
};

export const handleDOM = {
    renderList: function() {
        const items = document.querySelector('#items');
        items.innerHTML = '';
        list.noteList.forEach((item, index) => {
            items.appendChild(elementFactory('div', '', 'item', '', `item${index}`, ''));
            items.lastChild.appendChild(elementFactory('input', 'checkbox', '', '', '', ''));
            items.lastChild.appendChild(elementFactory('div', '', 'note', '', '', item.note));
            items.lastChild.appendChild(elementFactory('div', '', '', '', '', ''));
            items.lastChild.lastChild.appendChild(elementFactory('div', '', 'date', '', '', item.date));
            items.lastChild.lastChild.appendChild(elementFactory('button', 'button', '', '', '', 'X'));
            items.lastChild.lastChild.lastChild.addEventListener('click', () => {
                const item = document.querySelector(`#item${index}`);
                items.removeChild(item);
                list.noteList.splice(index, 1);
            });
        });
    },
    renderProjects: function() {
        const panel = document.querySelector('#projects-panel');
        panel.innerHTML = '';
        list.projectList.forEach((project, index) => {
            panel.appendChild(elementFactory('div', '', 'selection', '', `project${index}`, project));
        });
    }
};