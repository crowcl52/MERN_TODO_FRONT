import React, { useReducer } from 'react';

import authContext from './authContext';
import authRedcuer from './authRedcuer';

import * as fromTypes from '../../types';
import clientAxios from '../../config/axios';
import tokenAuth from '../../config/authToken';


const AuthState = props => {
    const initState = {
        user: null,
        token: localStorage.getItem('token'),
        authUser: null,
        msg: ''
    }

    // dispatch para ejecutar las acciones

    const [state, dispatch] = useReducer(authRedcuer, initState);

    // funcion para la carga de archivos
    const getUserFn = user => {
        dispatch({
            type: fromTypes.AUTH,
            payload: user
        })
    }

    // funciones para el CRUD

    const registerUSer = async data => {
        try {
            const resp = await clientAxios.post('api/usuarios', data);
            console.log(resp)
            dispatch({
                type: fromTypes.SUCCESS_REGISTER,
                payload: resp.data
            });
            // obtener usuario
            userAuthFn();

        } catch (err) {
            console.log(err.response.data)
            const alert = {
                severity: 'error',
                msg: err.response.data.msg
            }
            dispatch({
                type: fromTypes.ERROR_REGISTER,
                payload: alert
            })
        }
    }

    const userAuthFn = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            // funcion para enviar token
            tokenAuth(token);
        }

        try {
            const resp = await clientAxios.get('/api/auth');
            console.log(resp.data)
            dispatch({
                type: fromTypes.AUTH,
                payload: resp.data.user
            })

        } catch (err) {
            console.log(err)
            dispatch({
                type: fromTypes.LOGIN_ERROR,
            })
        }
    }

    // el usuario  inicia session
    const loginFn = async user => {
        try {

            const resp = await clientAxios.post('/api/auth',user)
            console.log(resp.data)
            dispatch({
                type: fromTypes.SUCCESS_REGISTER,
                payload: resp.data
            });
            // obtener usuario
            userAuthFn();
        } catch (err) {
            console.log(err.response.data)
            const alert = {
                severity: 'error',
                msg: err.response.data.msg
            }
            dispatch({
                type: fromTypes.ERROR_REGISTER,
                payload: alert
            })
        }
    }

    const logOutFn = ()=>{
        dispatch({
            type: fromTypes.LOGOUT
        })
    }

    return (
        <authContext.Provider
            value={{
                msg: state.msg,
                token: state.token,
                authUser: state.authUser,
                user: state.user,
                getUserFn,
                registerUSer,
                userAuthFn,
                loginFn,
                logOutFn
            }}
        >
            {props.children}
        </authContext.Provider>
    )
};

export default AuthState;