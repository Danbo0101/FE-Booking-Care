

import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from '../action/userAction';


const INITIAL_STATE = {
    account: {
        id: null,
        name: "",
        email: "",
        address: "",
        gender: "",
        roleId: "",
        phone: "",
        access_token: '',
        image: '',
    },
    isAuthenticated: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state, account: {
                    id: action?.payload?.id,
                    name: action?.payload?.name,
                    email: action?.payload?.email,
                    address: action?.payload?.address,
                    gender: action?.payload?.gender,
                    roleId: action?.payload?.roleId,
                    phone: action?.payload?.phone,
                    access_token: action?.payload?.access_token,
                    image: action?.payload?.image,
                },
                isAuthenticated: true
            };

        case USER_LOGOUT_SUCCESS:
            return {
                ...state, account: {
                    id: "",
                    name: "",
                    email: "",
                    address: "",
                    gender: "",
                    roleId: "",
                    phone: "",
                    access_token: '',
                    image: '',
                },
                isAuthenticated: false

            };
        default: return state;
    }
};

export default userReducer;