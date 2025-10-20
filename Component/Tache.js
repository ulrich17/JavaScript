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
            <form id="todo-form">
                <label for="name">Tâche :</label>
                <input class="input" type="text" id="name" name="tache" required />
                <button class="btn"> Ajouter </button>
            </form>
            <div class="liste">
                <label>Liste de tâches :</label>
                <ul class="list-group"></ul>
            </div>
        `;

        this.#listelement = element.querySelector('.list-group');
        const form = element.querySelector('#todo-form');
        const input = element.querySelector('#name');

        form.addEventListener('submit', e => {
            e.preventDefault();
            const title = input.value.trim();
            if (title) {
                this.#todos.push({
                    id: Date.now(),
                    title,
                    completed: false
                });
                this.#render();
                this.#saveToLocalStorage();
                input.value = '';
            }
        });
        this.#render();
    }
    #render() {
        if (!this.#listelement) return;
        this.#listelement.innerHTML = '';

        this.#todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'todo-item'
            li.textContent = todo.title;
            // Crée un bouton supprimer
            const btn = document.createElement('button');
            btn.textContent = 'Supprimer';
            btn.className = 'supprimer';
            btn.addEventListener('click', () => {
                this.#todos = this.#todos.filter(t => t.id !== todo.id);
                this.#render();
                this.#saveToLocalStorage();
            });
            li.appendChild(btn);
            this.#listelement.appendChild(li);
        });
    }
    #saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.#todos));
    }
}
