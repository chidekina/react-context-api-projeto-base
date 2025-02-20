import React, { createContext, useReducer, useState } from "react";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

const estadoInicial = [];

export const CarrinhoProvider = ({ children }) => {
    const [carrinho, dispatch] = useReducer(carrinhoReducer, estadoInicial);
    const [quantidade, setQuantidade] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);

    return (
        <CarrinhoContext.Provider value={{ 
            carrinho, 
            setCarrinho, 
            quantidade, setQuantidade, valorTotal, setValorTotal }}>
            {children}
        </CarrinhoContext.Provider>
    )
}