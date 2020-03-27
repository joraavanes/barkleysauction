import { GET_COMMENTS, CLEAR_COMMENTS } from '../actions/types/types'

const defaultCommentReducer = {
    quantity: 0,
    comments: undefined
};

export default function(state = defaultCommentReducer, action){
    switch (action.type) {
        case GET_COMMENTS:
            return {
                ...state,
                comments: action.comments
            };
        case CLEAR_COMMENTS:
            return{
                ...state,
                comments: undefined
            };
        default:
            return state;
    }
};