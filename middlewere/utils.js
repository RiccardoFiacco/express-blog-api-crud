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

module.exports = exists;