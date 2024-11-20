const posts = require('../data/posts.js'); //importiamo i post

function index(req, res){
    console.log("ritorno dei post");
    let postList = posts;
    let id =parseInt(req.query.limit);
    
    if(postId === -1){
        console.log("non presente")
        res.status(404)
        return res.json({
            error:"not found",
            message:"non presente"
        })
    }

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
    const id = parseInt(req.params.id)

    let post;
    if(id && !isNaN(id) && id>=0){ //se id è un numero e maggiore o uguale a 0
       post = posts.find((el)=>el.id === id)
    }

    res.json(post)
}

function store(req, res){
    let obj = {
        title: "cavolo cappuccio",
        slug: "cavolo-cappuccio",
        content: `il cavolo cappuccio è una verdura di origine lombarda e precisamente della Brianza, la zona compresa tra la provincia a nord di Milano e il lago di Lecco-Como!`,
        image: "cavolo-cappuccio.jpeg",
        tags: ["verdure", "verdure al cioccolato", "verdureee", "ricette vegetariane", "ricette al forno"],
    }
    posts.push(obj)
    res.send("creato elemento")
}
function update(req, res){
    res.send("modifica tutto elemento")
}
function modify(req, res){
    res.send("modifica parte dell elemento")
}
function destroy(req, res){
    let id = parseInt(req.params.id)
    const postId = posts.findIndex((el)=> el.id === id)

    if(postId === -1){
        console.log("non presente")
        res.status(404)
        return res.json({
            error:"not found",
            message:"non presente"
        })
    }
    posts.splice(postId, 1)
    res.send("eliminiazione dell elemento")
}

module.exports={index, show, store, update, modify, destroy}