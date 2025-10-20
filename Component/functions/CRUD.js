import { readFile, writeFile } from "node:fs/promises";
import  {NotFoundError} from "../errors/NotFoundError.js";

const path = 'Data/todos.json'

//          Méthode CRUD       //
/**
 * @type {object} Todo
 * @property {string} title
 * @property {number} id
 */

// Liste l'ensemble de tâches //
/**
 * @returns {Promise<Todo[]>}
 */
export async function findAllT(){
    const data = await readFile(path, 'utf-8')
        return JSON.parse(data)
}
// Méthode qui sert à créer de tâches //
/** 
 * @param {string} title
 * @return {Promise<Todo[]>}
 */
export async function createT(title){
    const todo = {title, id: Date.now()}
    const todos = [todo, ... await findAllT() ]
    await writeFile(path, JSON.stringify(todos, null, 2))
}
// Méthode servant à modifier une tâche
/** 
 * @param {number} id
 * @param {title?:string} MAJ_Todo
 * @return {Promise}
 */
export async function updateT(id, MAJ_Todo){
    const todos = await findAllT()
    const todo = todos.find(todo =>todo.id === id)
    if(todo === undefined){
        throw new NotFoundError()
    }
    // Mise à jour de la tâche
    Object.assign(todo, MAJ_Todo)
    // recrit la liste complète des todos avec le todo modifié
    await writeFile(path, JSON.stringify(todos, null, 2))
    // Retourne la tâche mise à jour
    return todo
}

// Méthode servant à supprimer les tâches
/**
 * @param {number} id 
 * @return {Promise}
 */
export async function removeT(id){
    const todo = await findAllT()
    const todos = todo.findIndex(todos => todos.id == id)

    if (todo === -1){
        throw new NotFoundError()
    }
    await writeFile (path, JSON.stringify(todo.filter(todos => todos.id !== id), null, 2 ))
}

