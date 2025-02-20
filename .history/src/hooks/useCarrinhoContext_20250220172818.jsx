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
})

const removeProdutoAction = (produtoId) =>( {
    type: REMOVE_PRODUTO,
    payload: produtoId,
})

const removeProdutoAction = () =>( {
    type: REMOVE_PRODUTO,
    payload: novoProduto,
})

export const useCarrinhoContext = () => {
    const {
        carrinho,
        dispatch,
        quantidade,
        valorTotal,
    } = useContext(CarrinhoContext);

    const mudarQuantidade = (id, quantidade) => {
        carrinho.map((itemDoCarrinho) => {
            if (itemDoCarrinho === id) itemDoCarrinho.quantidade += quantidade;
            return itemDoCarrinho;
        })
    }

    const adicionarProduto = (novoProduto) => {
        const temOProduto = carrinho.some((itemDoCarrinho) => (
            itemDoCarrinho.id === novoProduto.id
        ));

        if (!temOProduto) {
            novoProduto.quantidade = 1;
            return setCarrinho((carrinhoAnterior) => [
                ...carrinhoAnterior,
                novoProduto
            ]);
        }

        const carrinhoAtualizado = mudarQuantidade(novoProduto.id, 1)

        setCarrinho([...carrinhoAtualizado]);
    }

    const removerProduto = (id) => {
        const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);
        const ehOUltimo = produto.quantidade === 1;

        if (ehOUltimo) {
            return setCarrinho((carrinhoAnterior) =>
                carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id)
            );
        }

        const carrinhoAtualizado = mudarQuantidade(id, -1)
        setCarrinho([...carrinhoAtualizado]);
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