import axios from 'axios'
import { ADD_BID, GET_BIDS, TOGGLE_BID_LOADER } from './types/types'
import { itemsLoading } from './itemActions'
import { addError, clearErrors } from './errorActions'

const url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

export const getBids = uuid => dispatch => {
    dispatch(itemsLoading(true));

    axios.get(`${url}/bids/${uuid}`)
        .then(bids => {
            dispatch(itemsLoading(false));
            dispatch({
                type: GET_BIDS,
                bids
            });
        }).catch((err) => {
            dispatch(addError('Bid', 'Failed to get bids'));
            dispatch(itemsLoading(false));
        });
};

export const addBid = (uuid, bidPrice, auth) => dispatch => {
    if(!auth){
        dispatch(addError('bid', 'Please login to bid'));
        return;
    }

    if(!bidPrice){
        dispatch(addError('bid', 'Please insert your bid'));
        return;
    }

    dispatch(itemsLoading(true));
    dispatch(toggleLoader(true));
    
    axios.post(`${url}/bids/${uuid}`, {bidPrice}, {headers: { 'x-auth': auth.token}})
        .then(res => {
            dispatch(itemsLoading(false));
            dispatch(toggleLoader(false));
            dispatch(clearErrors());
            
            dispatch({
                type: ADD_BID,
                bid: {
                    uuid: res.data.uuid,
                }
            });
            
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