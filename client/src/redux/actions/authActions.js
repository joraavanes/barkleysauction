import axios from 'axios'
import { ADD_TOKEN,CLEAR_TOKENS } from './types/types'
import { toggleLoader } from './pageStateActions'

const url = process.env.NODE_ENV == 'production' ? '/' : 'http://localhost:3000/';

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
            dispatch(toggleLoader());
        });    
};

export const register = ({name, surname, email, password}) => dispatch => {
    dispatch(toggleLoader());

    axios.post(`${url}users/register`, {name, surname, email, password})
        .then(payload => {
            
            dispatch({
                type: ADD_TOKEN,
                token: payload.data
            });
            dispatch(toggleLoader());
        })
        .catch(err => {
            dispatch(toggleLoader());
        });
};

export const logUserMessage = () => ({

});