import { useDispatch, useSelector } from 'react-redux';

// Use these throughout the app instead of plain useDispatch/useSelector
export const useAppDispatch = () => useDispatch();
export const useAppSelector = (selector) => useSelector(selector);