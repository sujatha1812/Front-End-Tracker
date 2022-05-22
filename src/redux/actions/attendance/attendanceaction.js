import axios from "axios";
import {
    ATTENDANCE_REQUEST,
    ATTENDANCE_SUCCESS,
    ATTENDANCE_FAIL,
    STUDENT_DETAIL_REQUEST,
    STUDENT_DETAIL_SUCCESS,
    STUDENT_DETAIL_FAIL,
    STUDENT_DATA_REQUEST,
    STUDENT_DATA_SUCCESS,
    STUDENT_DATA_FAIL,
    CHECKOUT_UPDATE_REQUEST,
    CHECKOUT_UPDATE_SUCCESS,
    CHECKOUT_UPDATE_FAIL
} from "./actionTypes";


export const GenerateCode = () => {
    return async (dispatch, getState) => {
        const { userInfo } = getState().userLogin;
        try {
            dispatch({
                type: ATTENDANCE_REQUEST,
            });

            const config = {
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `${userInfo.token}`,

                },
            };
            const { data } = await axios.get(
                "/generate-code",
                config
            );
            dispatch({
                type: ATTENDANCE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ATTENDANCE_FAIL,
                payload: error.response.data.message,
            });
        }
    };
};

export const getstudentDetail = (id) => {
    return async (dispatch, getState) => {
        const { userInfo } = getState().userLogin;
        try {
            dispatch({
                type: STUDENT_DETAIL_REQUEST,
            });
            const config = {
                headers: {
                    authorization: `${userInfo.token}`,
                },
            };
            const { data } = await axios.get(`/get-student-detail/${id}`, config);
            dispatch({
                type: STUDENT_DETAIL_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: STUDENT_DETAIL_FAIL,
                payload: error.response && error.response.data.message,
            });
        }
    };
};

export const getstudentData = () => {
    return async (dispatch, getState) => {
        const { userInfo } = getState().userLogin;
        try {
            dispatch({
                type: STUDENT_DATA_REQUEST,
            });
            const config = {
                headers: {
                    authorization: `${userInfo.token}`,
                },
                params: {
                    id: JSON.parse(sessionStorage.getItem("id")),
                }
            };
            const { data } = await axios.get('/get-student-data', config);
            dispatch({
                type: STUDENT_DATA_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: STUDENT_DATA_FAIL,
                payload: error.response && error.response.data.message,
            });
        }
    };
};

export const updateCheckout = (checkOutTime) => {
    return async (dispatch, getState) => {
        const { userInfo } = getState().userLogin;
        try {
            dispatch({
                type: CHECKOUT_UPDATE_REQUEST,
                loading: true,
            });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `${userInfo.token}`,
                },
            };
            const { data } = await axios.put(
                "/check-out",
                checkOutTime,
                config
            );

            dispatch({
                type: CHECKOUT_UPDATE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: CHECKOUT_UPDATE_FAIL,
                loading: false,
                error: error.response && error.response.data.message,
            });
        }
    };
};