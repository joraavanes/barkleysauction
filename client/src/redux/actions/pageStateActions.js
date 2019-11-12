import { LOGIN_MODAL_STATE } from './types/types'

export const toggleLoginModal = () => dispatch => {
    dispatch({
        type: LOGIN_MODAL_STATE
    });
};