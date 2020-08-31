import React, { useReducer } from 'react';

import taskContext from './taskContext';
import taskReducer from './taskReducer';

import * as fromTypes from '../../types';

import clientAxios from '../../config/axios';

const TaskState = props => {
    const initState = {
        tasks: [],
        currentTask: null,
        completeTask: [],
        editTask: null,
        playInterval: false,
        msg: '',
        isLoadingTask: false,
        oldTaskFilter: null,
    }

    // dispatch para ejecutar las acciones

    const [state, dispatch] = useReducer(taskReducer, initState);

    // iniciar o pausar el intervalo
    const playIntervalFn = status => {
        dispatch({
            type: fromTypes.PLAY_INTERVAL,
            payload: status
        })
    }
    // obtener las tasks
    const getTasksFn = async projectId => {
        loadingTaskFn(true);
        try {
            const resp = await clientAxios.get(`/api/task/${projectId}`)
            console.log(resp.data)
            dispatch({
                type: fromTypes.GET_TASKS,
                payload: resp.data.task
            })
        } catch (error) {
            console.log(error)
            loadingTaskFn(false)
        }

    }
    // agregar tarea
    const addTaskFn = async task => {
        loadingTaskFn(true)
        try {
            const resp = await clientAxios.post('/api/task', task);
            console.log(resp.data)
            dispatch({
                type: fromTypes.ADD_TASK,
                payload: resp.data.task
            })
        } catch (err) {
            console.log(err)
            loadingTaskFn(false)
        }
    }
    // edit task
    const editTaskFn = async task => {
        loadingTaskFn(true)

        try {
            clientAxios.put(`/api/task/${task._id}`, task).then(resp => {
                getTasksFn(task.project)
            });

        } catch (err) {
            console.log(err)
            loadingTaskFn(false)
        }
    }
    // edit task sin refrescar
    const editTaskSilentFn = async task => {
        try {
            const resp = await clientAxios.put(`/api/task/${task._id}`, task)
            console.log(resp.data)
        } catch (err) {
            console.log(err)

        }
    }
    // editar una tarea en la modal
    const editTaskModalFn = task => {
        dispatch({
            type: fromTypes.GET_EDIT_TASK,
            payload: task
        })
    }
    // agrega una tarea inprogress si existe una la quita de inprogress
    const setInprogressTaskFn = async task => {
        // put loading action
        loadingTaskFn(true)
        try {
            if (state.currentTask) {
                const current = { ...state.currentTask, inprogress: false };
                const newCurrent = { ...task, inprogress: true };

                clientAxios.put(`/api/task/${current._id}`, current).then(resp => {
                    console.log(resp)
                    clientAxios.put(`/api/task/${newCurrent._id}`, newCurrent).then(resp => {
                        getTasksFn(task.project)
                    })
                })
            } else {
                const newCurrent = { ...task, inprogress: true }
                clientAxios.put(`/api/task/${task._id}`, newCurrent).then(resp => {
                    getTasksFn(task.project)
                })
            }

        } catch (err) {
            console.log(err)
            // put loading action
            loadingTaskFn(false)
        }
    }
    // mostar carga
    const loadingTaskFn = status => {
        dispatch({
            type: fromTypes.LOADING_TASK,
            payload: status
        })
    }

    const setMsgFn = text => {
        dispatch({
            type: fromTypes.SET_MSG,
            payload: text
        })
    }

    const filterTasksFn = type => {
        switch (type) {
            case 'all':
                dispatch({
                    type: fromTypes.FILTER_TASKS_ALL,
                    payload: type
                })
                break;
            case 'short':
                dispatch({
                    type: fromTypes.FILTER_TASKS_SHORT,
                    payload: type
                })
                break;
            case 'medium':
                dispatch({
                    type: fromTypes.FILTER_TASKS_MEDIUM,
                    payload: type
                })
                break;
            case 'long':
                dispatch({
                    type: fromTypes.FILTER_TASKS_LARGE,
                    payload: type
                })
                break;
            default:
                dispatch({
                    type: fromTypes.FILTER_TASKS_ALL,
                    payload: type
                })
                break;
        }
    }

    return (
        <taskContext.Provider
            value={{
                isLoadingTask: state.isLoadingTask,
                msg: state.msg,
                playInterval: state.playInterval,
                tasks: state.tasks,
                currentTask: state.currentTask,
                completeTask: state.completeTask,
                editTask: state.editTask,
                getTasksFn,
                playIntervalFn,
                addTaskFn,
                setInprogressTaskFn,
                editTaskFn,
                setMsgFn,
                editTaskModalFn,
                editTaskSilentFn,
                filterTasksFn
            }}
        >
            {props.children}
        </taskContext.Provider>
    )
};

export default TaskState;