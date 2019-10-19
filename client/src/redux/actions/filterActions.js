import axios from 'axios'
import {itemsLoading} from './itemActions'

const url = process.env.NODE_ENV === 'production'? 'https://protected-scrubland-62320.herokuapp.com': 'http://localhost:3000'

const findItemsByName = name => dispatch => {
    dispatch(itemsLoading());
    axios.get(`${url}/items/${name}`)
        .then(res => {
            dispatch({

            });
        });
};