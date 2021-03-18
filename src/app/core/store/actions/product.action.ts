import { createAction, props } from '@ngrx/store';

export const selectProducts = createAction('selectProducts', props<{}>());
export const selectProductsSuccess = createAction('selectProducts success', props<{ payload: any }>());


export const addProduct = createAction('addProduct', props<{ payload: any }>());
export const removeProduct = createAction('removeProduct', props<{ payload: any }>());



