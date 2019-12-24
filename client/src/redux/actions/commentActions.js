import axios from 'axios'
import { GET_COMMENTS, CLEAR_COMMENTS } from './types/types'

const url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

export const getComments = () => dispatch => {
    axios.get(`${url}/comments`)
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