import {    GET_COMMENTS,
            CLEAR_COMMENTS,
            TOGGLE_COMMENT_FORM,
            POST_COMMENT,
            EDIT_COMMENT,
            TOGGLE_LOADER,
            TOGGLE_EDIT_COMMENT_MODAL } from '../actions/types/types'

const defaultCommentReducer = {
    quantity: 0,
    comments: undefined,
    formToggle: false,
    editModal: false,
    commentEditData: {
        uuid: undefined,
        userName: undefined,
        comment: undefined,
        done: undefined
    },
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
        case EDIT_COMMENT:
            return{
                ...state,
                editModal: action.editModal,
                commentEditData: {
                    done: action.done
                }
            };
        case TOGGLE_COMMENT_FORM:
            return{
                ...state,
                formToggle: !state.formToggle,
                done: action.done
            }; 
        case TOGGLE_EDIT_COMMENT_MODAL:
            return{
                ...state,
                editModal: !state.editModal,
                commentEditData: {
                    uuid: action.uuid,
                    userName: action.userName,
                    comment: action.comment
                }
            };
        case CLEAR_COMMENTS:
            return{
                ...state,
                comments: undefined,
                commentEditData: {
                    done: undefined
                }
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