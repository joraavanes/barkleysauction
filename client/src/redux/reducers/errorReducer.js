
const errorReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_ERROR':
            return {...state, [action.errorType]: action.errorValue };
        case 'REMOVE_ERROR':
            return {...state, [action.errorType]: undefined };
        case 'CLEAR_ERRORS':
            return {};
        default:
            return state;
    }
};

export default errorReducer;