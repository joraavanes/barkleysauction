import {GET_ITEMS,GET_ITEM,POST_ITEM,EDIT_ITEM,REMOVE_ITEM,ADD_PAGE_NUMBER,RESET_PAGE_NUMBER,ITEMS_LOADING,CLEAR_ITEMS,CLEAR_ITEM,ALL_FETCHED} from '../actions/types/types'

const defaultItemState = {
    items:[],
    pageNumber: 0,
    lastTimestamp: 0,
    loading: undefined
}

export default (state = defaultItemState, action) =>{
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: [...state.items, ...action.items],
                loading: action.loading,
                lastTimestamp: action.lastTimestamp
            };
        case GET_ITEM:
            return{
                ...state,
                item: action.item,
                loading: action.loading
            };
        case POST_ITEM:
            return{
                ...state,
                loading: action.loading,
                done: true,
                items:[]
            };
        case EDIT_ITEM:
            return{
                ...state,
                loading: action.loading,
                done:true
            };
        case REMOVE_ITEM:
            return{
                ...state,
                loading: action.loading,
                done: true
            }
        case CLEAR_ITEMS:
            return{
                ...state,
                items:[]
            };
        case CLEAR_ITEM:
            return{
                ...state,
                item: undefined,
                done:undefined
            }
        case ADD_PAGE_NUMBER:
            return{
                ...state,
                pageNumber: state.pageNumber + 1
            }
        case 'CLEAR_TIMESTAMP':
            return {
                ...state,
                lastTimestamp: undefined
            }
        case RESET_PAGE_NUMBER:
            return {
                ...state,
                pageNumber: 0
            }
        case ALL_FETCHED:
            return {
                ...state,
                pageNumber: undefined,
                lastTimestamp: undefined,
                loading: false
            }
        case ITEMS_LOADING:
            return{
                ...state,
                loading: action.loading
            }
        default:
            return state;
    }
};