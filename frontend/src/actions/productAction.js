import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    CLEAR_ERRORS
} from "../constants/productConstant";

import axios from "axios";

export const getProduct = () => async(dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });
        const { data } = await axios.get("/api/v1/products");
        console.log(data);
        dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    }
};

export const clearErrors = () => async(dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};