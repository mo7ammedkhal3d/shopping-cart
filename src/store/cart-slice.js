import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const initialCartState = {
    items: [],
    totalQuantity: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addItemtoCart(state, action){
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.itemId === newItem.id);
            state.totalQuantity++;
            if (!existingItem){
                state.items.push({
                    itemId: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title  
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price; 
            }
        },

        removeItemFromCart(state, action){
            const id = action.payload;
            const existingItem = state.items.find(item => item.itemId === id);
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.itemId !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }

    }
});

export  const sentCartData = (cart) =>{
    return async (uiDispatch) => {
      uiDispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data'
      }));

    const sendRequest = async () => {
        const response = await fetch('https://react-http-e7d8f-default-rtdb.firebaseio.com/cart.json',{
            method: 'PUT',
            body: JSON.stringify(cart),
        }); 

        if (!response.ok){
            throw new Error('Sending cart data failed.');
        }

        const responseData = await response.json();
    };

    
    try{

        await sendRequest();

        uiDispatch(
        uiActions.showNotification({
            status: 'success',
            title: 'Success',
            message: 'Send cart data successfully'
        })
        );
    } catch (error) {
        uiDispatch(
            uiActions.showNotification({
              status: 'error',
              title: 'Error!',
              message: 'Send cart data failed'
            })
        );
    }
}
}

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;