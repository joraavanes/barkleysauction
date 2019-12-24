import { LOGIN_MODAL_STATE,TOGGLE_LOADER } from '../actions/types/types'

const defaultPageStateRedcuer = {
    loginState: false,
    loading: false
};

const pageStateReducer = (state= defaultPageStateRedcuer, action) =>{
    switch (action.type) {
        case LOGIN_MODAL_STATE:
            return{
                ...state,
                loginState: !state.loginState
            };
        case TOGGLE_LOADER:
            return{
                ...state,
                loading: !state.loading
            }
        default:
            return state;
    }
};

export default pageStateReducer;