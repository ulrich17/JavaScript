import { Tache } from "./Component/Tache.js"

document.addEventListener('DOMContentLoaded',()=>{
    const todoInStorage = localStorage.getItem('todos')?.toString()
    let todos = []
    try{
        if(todoInStorage){
            todos = JSON.parse(todoInStorage) 
        }
    }catch(e){
        console.error('Erreur parsing',e);
    }
    
    const target = document.querySelector('#todolist .form');
    if(!target){
        console.error('Element introuvable dans todo');
        return; 
    }
        
    const listTache = new Tache(todos);
    listTache.appendTo(target);
});



