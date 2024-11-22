function exists(id, posts){
    const postId = posts.findIndex((el)=> el.id === parseInt(id) || el.slug === id)

    if(postId === -1){
        console.log("non presente")
        return({
            error:"not found",
            message:"non presente"
        })
    }

    return postId;
}


function checkId(req, res, next) {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.json({
            error: "id non è un numero"
        })
    } else {
        next();
    }
}


module.exports = {exists, checkId};