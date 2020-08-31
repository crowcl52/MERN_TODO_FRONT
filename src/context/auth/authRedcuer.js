import * as fromTypes from '../../types';

export default (state, action) => {
    switch (action.type) {
        case fromTypes.AUTH:
            return {
                ...state,
                user: { ...action.payload },
                authUser: true,
            }
        case fromTypes.SUCCESS_REGISTER:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                authUser: true,
                msg:''
            }
        case fromTypes.ERROR_REGISTER:
            return {
                ...state,
                token:null,
                msg: action.payload
            }
            case fromTypes.LOGIN_ERROR:
                localStorage.removeItem('token')
            return {
                ...state,
                token:null,
                msg: action.payload
            }
            case fromTypes.LOGOUT:
                localStorage.removeItem('token')
            return {
                ...state,
                user: null,
                authUser: false,
                token:null
            }
        default:
            return state;
    }
}