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
    BookObject: function(note, date) {
        this.note = note;
        this.date = date;
        this.check = false;
    },
    addItem: function() {
        const note = document.querySelector('#note');
        const date = document.querySelector('#date');
        const newNote = new this.BookObject(note.value, date.value, false);
        this.noteList.push(newNote); 
    },
};

export const handleDOM = {
    renderList: function() {
        const items = document.querySelector('#items');
        list.noteList.forEach((item, index) => {
            items.appendChild(elementFactory('div', undefined, 'item', undefined, `item${index}`, undefined));
            items.lastChild.appendChild(elementFactory('input', 'checkbox', undefined, undefined, undefined, undefined));
            items.lastChild.appendChild(elementFactory('div', undefined, 'note', undefined, undefined, item.note));
            items.lastChild.appendChild(elementFactory('div', undefined, undefined, undefined, undefined, undefined));
            items.lastChild.lastChild.appendChild(elementFactory('div', undefined, 'date', undefined, undefined, item.date));
            items.lastChild.lastChild.appendChild(elementFactory('button', 'button', undefined, undefined, undefined, 'X'));
        });
    },
};