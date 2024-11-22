const posts = require('../data/posts.js'); //importiamo i post
const exists = require('../middlewere/utils.js');
let lastIndex= posts.at(-1).id;

function index(req, res){
    console.log("ritorno dei post");
    let postList = posts;
    let id =parseInt(req.query.limit);

    //filtro con le query string
    if(req.query.tags){ //se esiste il tag
        postList = posts.filter((element)=>{ //per ogni elemento
            return element.tags.includes(req.query.tags); //ritorniamo solo quelli che hanno il valore inserito
        })
    }

    //limite di post
    if(id && !isNaN(id) && id>=0){ //se id è un numero e maggiore o uguale a 0
        postList = posts.slice(0, id)
    }

    res.json(postList)
}

function show(req, res){
    console.log("ritorno del post rischiesto");
    const id =  req.params.id
    let post;

    const result = exists(id, posts)
    if(typeof result === 'object'){
        res.status(404)
        return res.json(result)
    }

    if(parseInt(id) && !isNaN(parseInt(id)) && parseInt(id)>=0){ //se id è un numero e maggiore o uguale a 0
       post = posts.find((el)=>el.id === parseInt(id))
    }else{
        post = posts.find((el)=>el.slug=== id) 
    }

    res.json(post)
}

function store(req, res){
    const {title, slug, content, image, tags} = req.body;

    if(!title || !slug || !content || !image || !tags){
        res.status(403)
        return res.json({
            error:"invalid req",
            message:"dati non completi"
        })
    }
    let obj = {
        id: lastIndex+1,
        title: title,
        slug: slug,
        content: content,
        image: image,
        tags: tags
    }
    posts.push(obj)
    res.status(201)
    res.send("creato elemento")
}

function update(req, res){
    const id =  req.params.id
    const result = exists(id, posts)
    if(typeof result === 'object'){
        res.status(404)
        return res.json(result)
    }

    const {title, slug, content, image, tags} = req.body;
    let error = [];
    if(!title){ error.push("name non presente") } 
    if(!slug){ error.push("slug non presente") }
    if(!content){ error.push(" content non presente") } 
    if(!image){ error.push("image non presente") }
    if(!tags){ error.push("tags non presente") }

    if(error.length > 0){
        res.status(403)
        return res.json({
            error:"invalid req",
            message: error
        })
    }
    const post = posts.find((el)=>el.id === parseInt(id));

    post.title = title
    post.slug = slug
    post.content = content
    post.image = image
    post.tags = tags

    res.status(201)
    res.send("modificato tutto l'elemento")
}

function modify(req, res){
    const id =  req.params.id
    const result = exists(id, posts) //richiamiamo il metodo per vedere se l'id esiste
    if(typeof result === 'object'){// se ci ritorna un oggetto (cioè l'errore)
        res.status(404) //diamo stato 404
        return res.json(result)// e ritorno l'oggetto che mi restituisce la funzione
    }

    const keysArr = Object.keys(req.body); //se invece esiste l'id, prendo le chiavi del json che mi è stato mandato
    if(keysArr.length == 0){ //se sono 0
        return res.json({error:"insert something"}) //vuol dire che non mi hanno mandato nulla
    }

    const {title, slug, content, image, tags} = req.body; //altrimenti prendo i dati 
    const post = posts.find((el)=>el.id === parseInt(id)); //cerco il post con l'id chge mi è stato mandato
    // se esiste il valore faccio la modifica 
    if(title){ post.title = title } 
    if(slug){ post.slug = slug }
    if(content){ post.content = content } 
    if(image){ post.image = image }
    if(tags){ post.tags = tags }

    res.send("modifica parte dell elemento")
}

function destroy(req, res){
    let id = req.params.id
    const result = exists(id, posts)
    if(typeof result === 'object'){
        res.status(404)
        return res.json(result)
    }
    posts.splice(result, 1)
    res.send("eliminiazione dell elemento")
}

module.exports={index, show, store, update, modify, destroy}