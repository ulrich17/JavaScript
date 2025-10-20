import {createT, findAllT, removeT, updateT} from "../functions/CRUD.js"
import { json } from 'node:stream/consumers';

// Méthode index qui permet de gérer la partie index
export async function index(req, res){
    return findAllT()
}
// Méthode qui permet de créer les tâches
export async function create(req, res){
    return createT(await json (req))
}
// Méthode qui permet de supprimer les tâches
export async function remove(req, res, url){
    const id = parseInt(url.searchParams.get('id'), 10)
    await removeT(id)
    res.writeHead(204)
}

// Méthode qui permet de modifier les tâches
export async function update(req, res, url){
    const id = parseInt(url.searchParams.get('id'), 10)
    return updateT(id, await json(req))
}