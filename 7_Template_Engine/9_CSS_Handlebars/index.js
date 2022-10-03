const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({
  partialsDir: ["views/partials"]
})

app.engine('handlebars', hbs.engine)

app.set('view engine', 'handlebars')

app.use(express.static('public'))

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

app.get('/blog', (req, res) => {
  const posts = [
    {
      title: 'Aprender Node.JS',
      category: 'Javascrip',
      body: 'Este artigo vai te ajudar a aprender Node.Js',
      comments: 4,
    },
    {
      title: 'Aprender PHP',
      category: 'PHP',
      body: 'Este artigo vai te ajudar a aprender Lumen',
      comments: 4,
    },
    {
      title: 'Aprender Django',
      category: 'Python',
      body: 'Este artigo vai te ajudar a aprender Django',
      comments: 4,
    },
  ]

  res.render('blog', {posts})
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
