const posts = require('../data/posts.js'); //importiamo i post
let lastIndex= posts.at(-1).id;

function index(req, res, next){
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
    next()
}

function show(req, res, next){
    console.log("ritorno del post rischiesto");
    const id =  req.params.id
    let post;
    if(parseInt(id) && !isNaN(parseInt(id)) && parseInt(id)>=0){ //se id è un numero e maggiore o uguale a 0
        post = posts.find((el)=>el.id === parseInt(id))
    }else{
        post = posts.find((el)=>el.slug=== id) 
    }

    res.json(post)
    next()
}

function store(req, res, next){
    const {title, slug, content, image, tags} = req.body;
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
    next()
}

function update(req, res, next){
    const id =  req.params.id
    const {title, slug, content, image, tags} = req.body;
    const post = posts.find((el)=>el.id === parseInt(id));

    post.title = title
    post.slug = slug
    post.content = content
    post.image = image
    post.tags = tags

    res.status(201)
    res.send("modificato tutto l'elemento")
    next()
}

function modify(req, res, next){
    const id =  req.params.id

    const {title, slug, content, image, tags} = req.body; //altrimenti prendo i dati 
    const post = posts.find((el)=>el.id === parseInt(id)); //cerco il post con l'id chge mi è stato mandato
    // se esiste il valore faccio la modifica 
    if(title){ post.title = title } 
    if(slug){ post.slug = slug }
    if(content){ post.content = content } 
    if(image){ post.image = image }
    if(tags){ post.tags = tags }

    res.send("modifica parte dell elemento")
    next()
}

function destroy(req, res, next){ //problema
    let id = req.params.id
    posts.splice(id, 1)
    res.send("eliminiazione dell elemento")
    next()
}

module.exports={index, show, store, update, modify, destroy}