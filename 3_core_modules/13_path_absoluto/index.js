const path = require('path');

//path absoluto
console.log(path.resolve("text.txt"))

//formar path 
const midFolder = "relotorios"
const fileName = "matheus.txt"

const finalPath = path.join("/", 'arquivos', midFolder, fileName)

console.log(finalPath)
