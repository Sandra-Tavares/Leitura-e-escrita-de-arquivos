const produtos = require('../bancodedados/produtos')
const { getStateFromZipcode } = require('utils-playground');


const listarProdutos = async (req, res) => {
    console.log(produtos);
    return res.status(200).json(produtos);
};

const detalharProduto = async (req, res) => {
    const { idProduto } = (req.params)

    if (isNaN(idProduto)) {
        return res.status(400).json({ mensagem: 'O valor do parâmetro ID da URL não é um número válido.' });
    }
    const produto = produtos.find(produto => produto.id === Number(idProduto));

    if (!produto) {
        return res.status(404).json({ mensagem: 'Não existe produto para o ID informado.' });
    };

    return res.json(produto);
};
const calcularFrete = async (req, res) => {
    const { idProduto, cep } = (req.params)
    if (isNaN(idProduto)) {
        return res.status(400).json({ mensagem: 'O valor do parâmetro ID da URL não é um número válido.' });
    }
    const produto = produtos.find(produto => produto.id === Number(idProduto));

    if (!produto) {
        return res.status(404).json({ mensagem: 'Não existe produto para o ID informado.' });
    };

    try {
        const estado = await getStateFromZipcode(cep);

        let valorFrete = 0;

        if (estado === 'SP' || estado === 'RJ') {
            valorFrete = produto.valor * 0.15;

            return res.json({
                produto,
                estado,
                frete: valorFrete
            });
        }

        if (estado === `BA' || estado === 'SE' || estado === 'AL' || estado === 'PE' || estado === 'PB`) {
            valorFrete = produto.valor * 0.12;

            return res.json({
                produto,
                estado,
                frete: valorFrete
            });

        } else {
            valorFrete = produto.valor * 0.10;
            return res.json({
                produto,
                estado,
                frete: valorFrete
            });
        }
    } catch (error) {
        return res.status(400).json({ mensagem: error.mensagem });
    }

}



module.exports = {
    listarProdutos,
    detalharProduto,
    calcularFrete,


}