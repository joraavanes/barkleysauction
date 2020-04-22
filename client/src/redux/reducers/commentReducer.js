import { GET_COMMENTS, CLEAR_COMMENTS, TOGGLE_COMMENT_FORM, POST_COMMENT, TOGGLE_LOADER } from '../actions/types/types'

const defaultCommentReducer = {
    quantity: 0,
    comments: undefined,
    formToggle: false,
    loading: false
};

export default function(state = defaultCommentReducer, action){
    switch (action.type) {
        case GET_COMMENTS:
            return {
                ...state,
                comments: action.comments
            };
        case POST_COMMENT:
            return{
                ...state,
                newComment: action.newComment,
                loading: action.loading,
                done: action.done
            };
        case TOGGLE_COMMENT_FORM:
            return{
                ...state,
                formToggle: !state.formToggle,
                done: action.done
            }            
        case CLEAR_COMMENTS:
            return{
                ...state,
                comments: undefined
            };
        case TOGGLE_LOADER:
            return{
                ...state,
                loading: action.loading
            };
        default:
            return state;
    }
};