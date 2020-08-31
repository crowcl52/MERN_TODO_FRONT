import React, { useReducer } from 'react';

import projectContext from './projectContext';
import projectReducer from './projectReducer';

import * as fromTypes from '../../types';

import clientAxios from '../../config/axios';

const ProjectState = props => {
    const initState = {
        isLoading: false,
        showTaskModal: false,
        showToast: {
            severity: "error",
            open: false,
            msg: ""
        },
        projects: [],
        currentProject: null,
    }

    // dispatch para ejecutar las acciones

    const [state, dispatch] = useReducer(projectReducer, initState);

    // funcion para la carga de archivos
    const isLoadingFn = status => {
        dispatch({
            type: fromTypes.LOADING,
            payload: status
        })
    }

    // funcion para msotrar errores
    const showToastFn = toast => {
        dispatch({
            type: fromTypes.SHOW_TOAST,
            payload: toast
        })
    }

    // funcion para showTaskModal
    const showModalTaskFn = status => {
        dispatch({
            type: fromTypes.SHOW_TASK_MODAL,
            payload: status
        })
    }

    // obtener los proyectos
    const getProjectsFn = async projects => {
        try {
            const resp = await clientAxios.get(`/api/projects`);
            console.log(resp.data.projects)
            dispatch({
                type: fromTypes.GET_PROJECTS,
                payload: resp.data.projects
            })
        } catch (err) {
            console.log(err)
        }

    }

    // agregar proyecto
    const addProyectFn = async project => {
        try {
            const resp = await clientAxios.post('/api/projects', project);
            console.log(resp.data.proyecto)
            dispatch({
                type: fromTypes.ADD_PROJECT,
                payload: resp.data.proyecto
            })
        } catch (err) {
            console.log(err)
        }
    }

    // obtener proyecto actual
    const setCurrentProjectFn = project => {
        dispatch({
            type: fromTypes.GET_CURRENT_PROJECT,
            payload: project
        })
    }

    // funciones para el CRUD

    return (
        <projectContext.Provider
            value={{
                currentProject: state.currentProject,
                showToast: state.showToast,
                projects: state.projects,
                showtaskModal: state.showTaskModal,
                isLoading: state.isLoading,
                isLoadingFn,
                showModalTaskFn,
                getProjectsFn,
                addProyectFn,
                showToastFn,
                addProyectFn,
                setCurrentProjectFn
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
};

export default ProjectState;