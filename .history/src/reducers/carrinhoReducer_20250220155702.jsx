export const ADD_PRODUTO = "ADD_PRODUTO";
export const REMOVE_PRODUTO = "REMOVE_PRODUTO";
export const UPDATED_QUANTIDADE = "UPDATE_QUANTIDADE";

export const carrinhoReducer = (state, action) => {
    switch(action.type) {
        case ADD_PRODUTO:
            const novoProduto = action.payload;
            const produto = state.findIndex((item) => item.id === )
    }
}