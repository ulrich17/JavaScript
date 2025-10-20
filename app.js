import {Tache} from "./Component/Tache.js";
import { fetchJSON } from "./Component/api/api.js";

document.addEventListener("DOMContentLoaded", async ()=> {
    let todos = [];
    try {
        // appel à la méthode fetchJSON
        todos =   await fetchJSON('https://jsonplaceholder.typicode.com/todos?_limit=5',{
                method: 'GET',
            });
    }catch (e){
        console.error('Erreur lors du chargement des tâches API', e);
    }
    const target = document.querySelector('#todolist .form');
    
    
    if(!target){
        console.error('Element introuvable dans le DOM');
        return ;
    }
    // Création de l'objet Tache
    const listTache = new Tache(todos);
    listTache.appendTo(target);
});

