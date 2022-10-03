import {SEARCH_TEXT, CLEAR_SEARCH_TEXT, DEFAULT_SEARCH_STATE, SEARCH_END} from './types/types'

export const setSearchText = text => ({
    type: SEARCH_TEXT,
    text
});

export const clearSearchText = () => ({
    type: CLEAR_SEARCH_TEXT
});

export const defaultSearchState = () => ({
    type: DEFAULT_SEARCH_STATE
});

export const searchEnd = () => ({
    type: SEARCH_END
});