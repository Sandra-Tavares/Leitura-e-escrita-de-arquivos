const express = require('express');
const { listarProdutos, detalharProduto, calcularFrete } = require('./controladores/controles');

const rotas = express();

rotas.get('/produtos', listarProdutos);
rotas.get('/produtos/:idProduto', detalharProduto);
rotas.get('/produtos/:idProduto/frete/:cep', calcularFrete);

module.exports = rotas;
