import { useContext, useEffect, useMemo } from "react"
import { CarrinhoContext } from "@/context/CarrinhoContext"
import {
    ADD_PRODUTO,
    REMOVE_PRODUTO,
    UPDATE_QUANTIDADE,
} from "../reducers/carrinhoReducer"

const addProdutoAction = () =>( {
    type: ADD_PRODUTO,
    payload: novoProduto,
});

const removeProdutoAction = (produtoId) =>( {
    type: REMOVE_PRODUTO,
    payload: produtoId,
});

const updateQuantidadeAction = (produtoId, quantidade) =>( {
    type: REMOVE_PRODUTO,
    payload: { produtoId, quantidade },
})

export const useCarrinhoContext = () => {
    const {
        carrinho,
        dispatch,
        quantidade,
        valorTotal,
    } = useContext(CarrinhoContext);

    const adicionarProduto = (novoProduto) => {
        dispatch(addProdutoAction(novoProduto));
    }

    const removerProduto = (id) => {
       const produto = carrinho.find((item) => item.id === id);
    }

    const removerProdutoCarrinho = (id) => {
        const produto = carrinho.filter((item) => (item.id !== id));
        setCarrinho(produto);
    }

    const { totalTemp, quantidadeTemp } = useMemo(() => {
        return carrinho.reduce(
            (acumulador, produto) => ({
                quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
                totalTemp: acumulador.totalTemp + produto.preco * produto.quantidade,
            }), {
            quantidadeTemp: 0,
            totalTemp: 0,
        }
        );
    }, [carrinho])

    useEffect(() => {
        setQuantidade(quantidadeTemp);
        setValorTotal(totalTemp);
    })

    return (
        carrinho,
        setCarrinho,
        adicionarProduto,
        removerProduto,
        removerProdutoCarrinho
    )
}