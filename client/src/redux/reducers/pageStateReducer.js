import { LOGIN_MODAL_STATE } from '../actions/types/types'

const defaultPageStateRedcuer = {
    loginState: false
};

const pageStateReducer = (state= defaultPageStateRedcuer, action) =>{
    switch (action.type) {
        case LOGIN_MODAL_STATE:
            return{
                ...state,
                loginState: !state.loginState
            };
        default:
            return state;
    }
};

export default pageStateReducer;