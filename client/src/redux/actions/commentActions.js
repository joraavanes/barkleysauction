import axios from 'axios'
import { GET_COMMENTS, CLEAR_COMMENTS } from './types/types'

export const getComments = () => dispatch => {
    axios.get('http://localhost:3000/comments')
        .then(res => {
            dispatch({
                type: GET_COMMENTS,
                comments: res.data
            });
        })
        .catch(err => 'Unable to get comments');
};

export const clearComments = () => dispatch => {
    dispatch({
        type: CLEAR_COMMENTS
    });
};