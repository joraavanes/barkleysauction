import {ADD_ITEM,EDIT_ITEM,GET_ITEM,GET_ITEMS,ITEMS_LOADING,CLEAR_ITEMS} from './types/types'
import {setSearchText} from './filterActions'
import axios from 'axios'

const url = process.env.NODE_ENV === 'production'? '': 'http://localhost:3000'

export const getItems = () => dispatch => {
    dispatch(itemsLoading());
    axios.get(`${url}/items`)
        .then(res=>{
            dispatch({
                type:GET_ITEMS,
                loading:false,
                items: res.data
            });
        });
};

export const getItem = (name,id) => dispatch => {
    dispatch(itemsLoading());
    axios.get(`${url}/items/${name}/${id}`)
        .then(res => {
            dispatch({
                type: GET_ITEM,
                loading: false,
                items: res.data
            });
        });
};


export const getItemsByName = text => dispatch => {
    text = text.trim();
    if(text !== ''){
        dispatch(itemsLoading());
        dispatch(setSearchText(text));
        axios.get(`${url}/items/${text}`)
            .then(res => {
                dispatch({
                    type: GET_ITEMS,
                    items: res.data
                });
            });
    } else {
        dispatch(getItems());
    }
};

export const clearItems = () => ({
    type: CLEAR_ITEMS
});

export const itemsLoading = () => ({
    type: ITEMS_LOADING,
    loading: true
});