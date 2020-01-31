import {POST_ITEM,EDIT_ITEM,GET_ITEM,GET_ITEMS,ITEMS_LOADING,CLEAR_ITEMS,CLEAR_ITEM, ADD_ERROR} from './types/types'
import {setSearchText} from './filterActions'
import { clearErrors } from './errorActions';
import axios from 'axios'

const url = process.env.NODE_ENV === 'production'? '': 'http://localhost:3000'

export const getItem = (title,id) => dispatch => {
    dispatch(itemsLoading(true));
    axios.get(`${url}/products/${title}/${id}`)
        .then(res => {
            dispatch({
                type: GET_ITEM,
                loading: false,
                item: res.data
            });
        });
};

export const getItems = () => dispatch => {
    dispatch(itemsLoading(true));
    axios.get(`${url}/products`)
        .then(res=>{
            dispatch({
                type:GET_ITEMS,
                loading:false,
                items: res.data
            });
        });
};

export const getItemsByName = text => dispatch => {
    text = text.trim();
    if(text !== ''){
        dispatch(itemsLoading(true));
        dispatch(setSearchText(text));
        axios.get(`${url}/products/${text}`)
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

export const postItem = ({title, startingBid, description, imageUrl, thumbnail}) => dispatch =>{
    dispatch(itemsLoading(true));
    
    axios.post(`${url}/products`, {title,startingBid, description, imageUrl, thumbnail})
        .then(data => {
            dispatch({
                type: POST_ITEM,
                loading:false
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            const errorsArr = Object.entries(err.response.data.errors);
            
            dispatch(clearErrors());
            errorsArr.forEach(err => {
                dispatch({
                    type: ADD_ERROR,
                    errorType: err[0],
                    errorValue: err[1].message
                });
            });
            dispatch(itemsLoading(false));
        });
};

export const putItem = item => dispatch => {
    dispatch(itemsLoading());
    console.log(item);
    
    axios.put(`${url}/products/alter`, item)
        .then(res => {
            dispatch({
                type: EDIT_ITEM,
                loading: false
            });
        })
        .catch(err => {
            console.log(err.response);
        });
};

export const clearItems = () => ({
    type: CLEAR_ITEMS
});

export const clearItem = () => ({
    type: CLEAR_ITEM
});

export const itemsLoading = loading => ({
    type: ITEMS_LOADING,
    loading
});