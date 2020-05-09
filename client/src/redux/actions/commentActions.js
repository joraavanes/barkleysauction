import axios from 'axios'
import { GET_COMMENTS, CLEAR_COMMENTS, POST_COMMENT, TOGGLE_COMMENT_FORM, TOGGLE_LOADER, TOGGLE_EDIT_COMMENT_MODAL } from './types/types'
import { itemsLoading } from './itemActions'

const url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

export const getComments = (comments, productId) => dispatch => {
    if(comments){
        dispatch({
            type: GET_COMMENTS,
            comments
        });
        return;
    }

    if(productId){
        axios.get(`${url}/comments/${productId}`)
            .then(res => {
                dispatch({
                    type: GET_COMMENTS,
                    comments: res.data
                });
            })
            .catch(err => 'Unable to get comments');
    }
};

// find poroduct by given id and push the comment in the array, jwt token is also needed
export const postComment = (_id, userName, comment, token) => dispatch => {
    dispatch(itemsLoading(true));
    dispatch(toggleLoader(true));

    axios.post(`${url}/comments/${_id}`, {userName, comment}, {headers: { 'x-auth': token} })
        .then(res => {
            dispatch({
                type: POST_COMMENT,
                newComment: res.data,
                loading: false,
                done: true
            });
            dispatch(itemsLoading(false));
            dispatch(toggleLoader(false));
        })
        .catch(err => {
            console.log('failed post comment', err);
            dispatch(itemsLoading(false));
            dispatch(toggleLoader(false));
        });
};

export const toggleCommentForm = () => dispatch => {
    dispatch({
        type: TOGGLE_COMMENT_FORM,
        done: false
    });
};

export const EditCommentModal = () => dispatch => {
    dispatch({
        type: TOGGLE_EDIT_COMMENT_MODAL
    });
};

export const clearComments = () => dispatch => {
    dispatch({
        type: CLEAR_COMMENTS
    });
};

export const toggleLoader = loading => ({
    type: TOGGLE_LOADER,
    loading
});