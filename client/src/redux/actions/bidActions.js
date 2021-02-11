import axios from 'axios'
import { ADD_BID, GET_BIDS } from './types/types'
import { itemsLoading } from './itemActions'
import { addError } from './errorActions'

const url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

export const addBid = dispatch => (uuid, bidPrice, token) => {
    dispatch(itemsLoading(true));
    dispatch(toggleLoader(true));
    
    axios.post(`url/${uuid}`, {bidPrice}, {headers: { 'x-auth': token}})
    .then(res => {
        dispatch(itemsLoading(false));
        dispatch(toggleLoader(false));
        
        dispatch({
            type: ADD_BID,
            bid: {
                user: res.email,
                bidPrice: res.bidPrice,
                bidDate: res.bidDate
            }
        })
    })
    .catch(err => {
        dispatch(addError(err.message));
        
        dispatch(itemsLoading(false));
        dispatch(toggleLoader(false));
    });
};

export const toggleLoader = loading => ({
    type: 'TOGGLE_LOADER',
    loading
});