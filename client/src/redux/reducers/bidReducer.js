import { ADD_BID, GET_BIDS } from '../actions/types/types'

const defaultBidState = {
    loading: false
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
                bids: [
                    action.bid,
                    ...state.bids
                ]
            };
        default:
            return state;
    }
}