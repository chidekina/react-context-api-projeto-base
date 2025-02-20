import { useContext, useEffect, useMemo } from "react"
import { CarrinhoContext } from "@/context/CarrinhoContext"

export const useCarrinhoContext = () => {
    const {
        carrinho,
        setCarrinho,
        quantidade,
        setQuantidade,
        valorTotal,
        setValorTotal,
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

    const { totalTemp, quantidadeTemp } = useMemo

    useEffect(() => {
        setQuantidade(quantidadeTemp);
        setValorTotal(totalTemp);
    }, [carrinho]
    )

    return (
        carrinho,
        setCarrinho,
        adicionarProduto,
        removerProduto,
        removerProdutoCarrinho
    )
}