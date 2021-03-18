import { createAction, props } from '@ngrx/store';

export const searchCustomerDemographicNTB = createAction('searchCustomerDemographic', props<{}>());
export const searchCustomerDemographicNTBSuccess = createAction('searchCustomerDemographicNTBSuccess', props<{ payload: any }>());

//
export const navigateCustomerDemographicNTB = createAction('navigateApplicationList');

//
export const addCustomer = createAction('addCustomer', props<{ payload: any }>());
export const initCustomer = createAction('initCustomer', props<{ payload: any }>());
export const selectCustomer = createAction('selectCustomer');
export const searchRCAO = createAction('searchRCAO', props<{ payload: any }>());
export const updateRCAO = createAction('updateRCAO');
