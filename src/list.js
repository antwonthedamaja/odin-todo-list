function elementFactory(type, class1, class2, id, text) {
    const element = document.createElement(type);
    if (class1) element.classList.add(class1);
    if (class2) element.classList.add(class2);
    if (id) element.setAttribute("id", id);
    if (text) element.innerHTML = text;
    return element;
}

export const list = {
    noteList: [],
    renderList: function() {
        this.noteList.forEach(note => {

        });
    },
    addItem: function() {
        const newNote = {};
    },
};