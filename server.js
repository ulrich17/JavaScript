import { createServer } from 'node:http'
import {index, create,remove, update} from './Component/api/todo.js'
import { NotFoundError } from './Component/errors/NotFoundError.js'
import { createReadStream } from 'node:fs'


createServer(async (req, res) => {
  try{
    res.setHeader('Content-Type', 'application/json') // convention pour Content-Type
    const url = new URL(req.url, `http://${req.headers.host}`)
    // crée une constante 
    const endpoint = `${req.method}:${url.pathname}`
    let results
    switch(endpoint){
      // page d'accueil
      case 'GET:/':
        createReadStream('index.html').pipe(res)
        return;
      break;
      // Affiche les tâches
      case 'GET:/todos':
        results = await index(req, res)  
        break;
      // crée les tâches
      case 'POST:/todos':
          results = await create(req, res)  
          break;
      // Supprime les tâches
      case 'DELETE:/todos':
          results = await remove(req, res, url)  
          break;    
      // Modifie les tâches
      case 'PUT:/todos':
          results = await update(req, res, url)  
          break;        
      default: 
        res.writeHead(404)
    }

    if (results) {
      res.write(JSON.stringify(results))
    }
  } catch(e){
    if(e instanceof NotFoundError){
       res.writeHead(404)
    }else {
      throw e
    }
  }
  res.end()
}).listen(3000)

