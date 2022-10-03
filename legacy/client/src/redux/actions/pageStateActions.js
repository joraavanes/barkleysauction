import { LOGIN_MODAL_STATE, TOGGLE_LOADER } from './types/types'

export const toggleLoginModal = () => dispatch => {
    dispatch({
        type: LOGIN_MODAL_STATE
    });
};

export const toggleLoader = () =>({
    type: TOGGLE_LOADER
});