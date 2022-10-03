const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())

app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res, next) => {
  res.render('dashboard')
})

app.get('/', (req, res) => {

  const user = {
    name: 'Matheus',
    surname: 'Batisti',
    age: 36,
  }

  const palavra = 'Teste'

  const auth = false

  res.render('home', {user, palavra, auth})
})

app.listen(3000), () =>{
  console.log('App rodando na porta 3000!')
}
