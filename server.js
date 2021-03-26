const express = require("express")
const server = express()

server.listen(3000, () => console.log('rodando!'));

server.get('/', (request, response) => {
    return response.send('Teste');
})