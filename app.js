const express = require('express'); //importiamo express
const app =  express(); //andiamo a creare un server
const port = 3000; //attribuiamo una porta
const postRouter = require('./router/posts.js')
const errorH = require('./middlewere/errorsHandler.js')
const notFound = require('./middlewere/notFoundHandler.js')

app.use(express.static('public'));//rendiamo il contenuto della cartella public publico
app.use(express.json())//andiamo a rendere express in grado di leggere json come input
app.listen(port, ()=>{ //mettiamo il server in ascolto alla porta numero 3000
    console.log(`in ascolto sulla porta ${port}`)
})

app.use(errorH)
app.use(notFound)

app.use('/posts', postRouter)