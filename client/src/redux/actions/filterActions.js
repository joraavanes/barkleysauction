import {SEARCH_TEXT, CLEAR_SEARCH_TEXT} from './types/types'

export const setSearchText = text => ({
    type: SEARCH_TEXT,
    text
});

export const clearSearchText = () => ({
    type: CLEAR_SEARCH_TEXT
});