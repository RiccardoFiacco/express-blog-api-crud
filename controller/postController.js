const posts = require('../data/posts.js'); //importiamo i post

function index(req, res){
    console.log("lista dei post");
    res.json(posts)
}
function show(req, res){
    console.log("ritorno del post rischiesto");
    const id = parseInt(req.params.id)
    const post = posts[id]
    res.json(post)
}
function store(req, res){
    let obj = {
        title: "cavolo cappuccio",
        slug: "cavolo-cappuccio",
        content: `il cavolo cappuccio è una verdura di origine lombarda e precisamente della Brianza, la zona compresa tra la provincia a nord di Milano e il lago di Lecco-Como!`,
        image: "cavolo-cappuccio.jpeg",
        tags: ["verdure", "verdure al cioccolato", "verdureee", "Ricette vegetariane", "Ricette al forno"],
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
    res.send("eliminiazione dell elemento")
}

module.exports={index, show, store, update, modify, destroy}