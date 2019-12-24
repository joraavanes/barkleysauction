import { ADD_ERROR,REMOVE_ERROR,CLEAR_ERRORS } from './types/types'

export const addError = (errorType, errorValue) => ({
    type: ADD_ERROR,
    errorType,
    errorValue
});

export const removeError = errorType => ({
    type: REMOVE_ERROR,
    errorType
});

export const clearErrors = () => ({
    type: CLEAR_ERRORS
});