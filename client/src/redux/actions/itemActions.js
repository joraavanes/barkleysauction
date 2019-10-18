import {ADD_ITEM,EDIT_ITEM,GET_ITEM,GET_ITEMS,ITEMS_LOADING,CLEAR_ITEMS} from './types/types'
import axios from 'axios'

const url = process.env.NODE_ENV === 'production'? 'https://protected-scrubland-62320.herokuapp.com/': 'http://localhost:3000'

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

export const clearItems = () => ({
    type: CLEAR_ITEMS
});

export const itemsLoading = () => ({
    type: ITEMS_LOADING,
    loading: true
});