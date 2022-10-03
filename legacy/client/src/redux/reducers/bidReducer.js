import { ADD_BID, CLEAR_BIDS, GET_BIDS, TOGGLE_BID_LOADER } from '../actions/types/types'

const defaultBidState = {
    loading: false,
    bids: []
};

export default function BidReducer(state = defaultBidState, action){
    switch (action.type) {
        case GET_BIDS:
            return {
                ...state,
                bids: action.bids,
            };
        case ADD_BID:
            return {
                ...state,
                bid: action.bid
            };
        case CLEAR_BIDS:
            return {
                ...state,
                bids: []
            };
        case TOGGLE_BID_LOADER:
            return {
                ...state,
                loading: action.loading
            };
        default:
            return state;
    }
}