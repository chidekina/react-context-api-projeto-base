import { useContext } from "react"
import { CarrinhoContext } from "@/context/CarrinhoContext"

export const useCarrinhoContext = () => {
    const { carrinho, setCarrinho } = useContext(CarrinhoContext);

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

        setCarrinho(();
    }

    const removerProduto = (id) => {
        const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);
        const ehOUltimo = produto.quantidade === 1;

        if (ehOUltimo) {
            return setCarrinho((carrinhoAnterior) =>
                carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id)
            );
        }
        setCarrinho((carrinhoAnterior) =>
            carrinhoAnterior.map((itemDoCarrinho) => {
                if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade -= 1;
                return itemDoCarrinho;
            })
        );
    }

    return (
        carrinho,
        setCarrinho,
        adicionarProduto
    )
}