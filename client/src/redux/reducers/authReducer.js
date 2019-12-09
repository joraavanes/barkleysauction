import { ADD_TOKEN,REMOVE_TOKEN, CLEAR_TOKENS } from '../actions/types/types'

const authReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TOKEN:
            return[...state,action.token];
        case REMOVE_TOKEN:
            return state.filter(authItem => authItem.token != action.token);
        case CLEAR_TOKENS:
            return [];
        default:
            return state;
    }
};

export default authReducer;