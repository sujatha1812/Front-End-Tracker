import {
    STUDENT_DATA_REQUEST,
    STUDENT_DATA_SUCCESS,
    STUDENT_DATA_FAIL
} from "../../actions/attendance/actionTypes";

const getStudentDataReducer = (state = [], action) => {
    switch (action.type) {
        case STUDENT_DATA_REQUEST:
            return { loading: true };
        case STUDENT_DATA_SUCCESS:
            return {
                users: action.payload,
            };
        case STUDENT_DATA_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default getStudentDataReducer;
