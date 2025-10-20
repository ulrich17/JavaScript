/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

export class Tache {
    /** @type {Todo[]} */
    #todos = [];

    /** @type {HTMLUListElement | null} */
    #listelement = null;

    /**
     * @param {Todo[]} todos 
     */
    constructor(todos) {
        this.#todos = todos;
    }

    appendTo(element) {
        element.innerHTML = `
            <div class="liste">
                <label>Liste de tâches :</label>
                <ul class="list-group"></ul>
            </div>
        `;

        this.#listelement = element.querySelector('.list-group');
        this.#render();
    }
    #render() {
        if (!this.#listelement) return;
        this.#listelement.innerHTML = '';

        this.#todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'todo-item'
            li.textContent = todo.title;
            this.#listelement.appendChild(li);
        });
    }
    #saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.#todos));
    }
}
