const express = require('express');
const { pokemons, pokemon } = require('./controladores/controles');

const rotas = express();

rotas.get('/pokemon', pokemons);
rotas.get('/pokemon/:idOuNome', pokemon);

module.exports = rotas