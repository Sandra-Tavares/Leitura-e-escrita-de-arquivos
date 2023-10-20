const express = require('express');
const gerenciarEndereco = require('./controles/controles');



const rotas = express();


rotas.get('/enderecos/:cep', gerenciarEndereco);





module.exports = rotas;
