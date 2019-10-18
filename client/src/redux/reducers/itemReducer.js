import {GET_ITEMS,GET_ITEM,ITEMS_LOADING,CLEAR_ITEMS} from '../actions/types/types'

const defaultItemState = {
    items:[],
    loading: undefined
}

export default (state = defaultItemState, action) =>{
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items:action.items,
                loading: action.loading
            };
        case GET_ITEM:
            return{
                ...state,
                items: action.items,
                loading: action.loading
            };
        case CLEAR_ITEMS:
            return{
                ...state,
                items:[]
            };
        case ITEMS_LOADING:
            return{
                ...state,
                loading: action.loading
            }
        default:
            return state;
    }
};