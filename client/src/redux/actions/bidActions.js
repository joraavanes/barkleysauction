import axios from 'axios'
import { ADD_BID, GET_BIDS, TOGGLE_BID_LOADER } from './types/types'
import { itemsLoading } from './itemActions'
import { addError } from './errorActions'

const url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

export const addBid = (uuid, bidPrice, token) => dispatch => {
    dispatch(itemsLoading(true));
    dispatch(toggleLoader(true));
    
    axios.post(`${url}/bids/${uuid}`, {bidPrice}, {headers: { 'x-auth': token}})
    .then(res => {
        dispatch(itemsLoading(false));
        dispatch(toggleLoader(false));
        
        console.log(res);
        dispatch({
            type: ADD_BID,
            bid: {
                uuid: res.data.uuid,
            }
        })
    })
    .catch(err => {
        dispatch(addError('bid', err?.response?.data));

        dispatch(itemsLoading(false));
        dispatch(toggleLoader(false));
    });
};

export const toggleLoader = loading => ({
    type: TOGGLE_BID_LOADER,
    loading
});