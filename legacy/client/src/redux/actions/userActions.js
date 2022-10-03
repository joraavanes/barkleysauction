import axios from 'axios'
import { toggleLoader } from './pageStateActions'
import { itemsLoading } from './itemActions'

const url = process.env.NODE_ENV === 'production' ? '': 'http://localhost:3000';

export const getAllUsers = token => dispatch => {
    dispatch(itemsLoading(true));
    dispatch(toggleLoader(true));

    axios.get(`${url}/users/all`, {headers: { 'x-auth': token }})
        .then(res => {
            dispatch({
                type: 'ALL_USERS',
                users: res.data
            });
            
            dispatch(itemsLoading(false));
            dispatch(toggleLoader(false));
        });
};