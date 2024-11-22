function notFoundH (err, req, res, next){
    res.status(404)
    return res.json({
        error: err.message,
        message: "page not found"
    })
}

module.exports = notFoundH;