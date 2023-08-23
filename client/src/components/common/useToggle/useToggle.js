import { useReducer } from 'react';

/**
 * Custom hook for toggling a boolean value.
 */
export const useToggle = (initialValue = false) => useReducer((state) => !state, initialValue);
