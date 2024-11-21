const posts = require('../data/posts.js'); //importiamo i post
const exists = require('../utils/utils.js');
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
    if(req.body.tags.length > 1){
        let obj = {
            id: lastIndex+1,
            title: req.body.title,
            slug: req.body.slug,
            content: req.body.content,
            image: req.body.image,
            tags: req.body.tags
        }
        posts.push(obj)
    }
    res.status(201)
    res.send("creato elemento")
}

function update(req, res){
    res.send("modifica tutto elemento")
}
function modify(req, res){
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