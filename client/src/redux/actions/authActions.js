import axios from 'axios'
import { ADD_TOKEN } from './types/types'
import { toggleLoader } from './pageStateActions'

const url = process.env.NODE_ENV == 'production' ? 'https://protected-scrubland-62320.herokuapp.com/' : 'http://localhost:3000/users/login';

export const login = (email, password) => dispatch => {
    dispatch(toggleLoader());

    axios.post(`${url}`, {email, password})
        .then(token => {

            dispatch({
                type: ADD_TOKEN,
                token: token.data
            });
            dispatch(toggleLoader());
        })
        .catch(err => {
            dispatch(toggleLoader());
        });
};

export const logUserMessage = () => ({

});