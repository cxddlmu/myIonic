import { createAction, props } from '@ngrx/store';

export const searchApplication = createAction('searchApplication', props<{}>());
export const searchMoreApplication = createAction('searchMoreApplication', props<{}>());
export const searchApplicationSuccess = createAction('searchApplication success', props<{ payload: any }>());
export const inquiryCorporateApplication = createAction('inquiryCorporateApplication', props<{ applicationId: string }>());
export const inquiryIndividualApplication = createAction('inquiryIndividualApplication', props<{ applicationId: string }>());
export const inquiryApplicationSuccess = createAction('inquiryApplication success', props<{ payload: any }>());

//
export const navigateApplicationList = createAction('navigateApplicationList', props<{ payload: any }>());
export const navigateIndividualDemographicNTB = createAction('navigateIndividualDemographicNTB', props<{ customerSeq: string }>());
export const navigateCorporateDemographicNTB = createAction('navigateCorporateDemographicNTB');
export const navigateSessionSetupHome = createAction('navigateSessionSetupHome');
//
export const openDialog = createAction('openDialog');