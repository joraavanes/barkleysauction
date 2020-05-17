import {    GET_COMMENTS,
            CLEAR_COMMENTS,
            TOGGLE_COMMENT_FORM,
            POST_COMMENT,
            EDIT_COMMENT,
            EDIT_COMMENT_COMEPLETED,
            TOGGLE_LOADER,
            TOGGLE_EDIT_COMMENT_MODAL,
            TOGGLE_REMOVE_COMMENT_MODAL,
            REMOVE_COMMENT,
            REMOVE_COMMENT_COMEPLETED } from '../actions/types/types'

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
    removeModal: undefined,
    commentRemoveData: {
        uuid: undefined,
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
        case EDIT_COMMENT:
            return{
                ...state,
                editModal: action.editModal,
                commentEditData: {
                    done: action.done
                }
            };
        case EDIT_COMMENT_COMEPLETED:
            return{
                ...state,
                commentEditData:{
                    done: undefined
                }
            };
        case TOGGLE_REMOVE_COMMENT_MODAL:
            return{
                ...state,
                removeModal: !state.removeModal,
                commentRemoveData: {
                    uuid: action.uuid,
                }
            };
        case REMOVE_COMMENT:
            return{
                ...state,
                removeModal: !state.removeModal,
                commentRemoveData: {
                    done: action.done
                }
            };
        case REMOVE_COMMENT_COMEPLETED:
            return{
                ...state,
                commentRemoveData: {
                    done: undefined
                }
            }
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