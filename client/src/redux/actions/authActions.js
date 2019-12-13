import axios from 'axios'
import { ADD_TOKEN,CLEAR_TOKENS } from './types/types'
import { toggleLoader } from './pageStateActions'

const url = process.env.NODE_ENV == 'production' ? 'https://protected-scrubland-62320.herokuapp.com/' : 'http://localhost:3000/';

export const login = (email, password) => dispatch => {
    dispatch(toggleLoader());

    axios.post(`${url}users/login`, {email, password})
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

export const logout = token => dispatch => {
    dispatch(toggleLoader());
    
    axios.post(`${url}users/logout`,{token})
        .then(payload=>{
            
            dispatch({
                type: CLEAR_TOKENS
            });
            dispatch(toggleLoader());
        })
        .catch(err=> {
            console.log(err);
            dispatch(toggleLoader());
        });    
};

export const logUserMessage = () => ({

});