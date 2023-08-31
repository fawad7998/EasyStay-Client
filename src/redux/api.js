import {createAction} from '@reduxjs/toolkit';

export const apiCallBegan = createAction('api/callBegan');
export const apiCallSucceeded = createAction('api/callSuccess');
export const apiCallFailed = createAction('api/callFailure');
