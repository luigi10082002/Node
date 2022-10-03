const minimist = require('minimist');

const args = minimist(process.argv.slice(2))

console.log(args)

const nome = args['nome']
const profissao = args['profissao']

console,log(nome, profissao)

conosle.log(`seu nome é ${nome} e a sua profissão é ${profissao}`)
