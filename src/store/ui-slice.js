import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: { cartVisibility: false },
    reducers: {
        toggle(state) {
            state.cartVisibility = !state.cartVisibility; 
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;