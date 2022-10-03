const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())

app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res, next) => {

  const items = [
    "Item A", 
    "Item B", 
    "Item C"
  ]

  res.render('dashboard', {items})
})

app.get('/post', (res, req) => {
  const post = {
    title: 'Aprender Node.JS',
    categoria: 'Javascrip',
    body: 'Este artigo vai te ajudar a aprender Node.Js',
    comments: 4,
  }

  res.render('blogpost', {post})
})

app.get('/', (req, res) => {

  const user = {
    name: 'Matheus',
    surname: 'Batisti',
    age: 36,
  }

  const palavra = 'Teste'

  const auth = false

  const approved = true

  res.render('home', {user, palavra, auth, approved})
})

app.listen(3000), () =>{
  console.log('App rodando na porta 3000!')
}
