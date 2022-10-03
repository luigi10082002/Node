const express = require('express');

const app = express();

app.get('/home', (req, res) => {
  const ola = console.log('Olá')

  return ola
})

app.get('/home/mod', (req, res) => {
  const mod = console.log('Node')
})

app.listen('3000', () => {
  console.log('Servidor ON')
})
