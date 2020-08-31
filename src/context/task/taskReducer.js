import * as fromTypes from '../../types';


export default (state, action) => {
    switch (action.type) {
        case fromTypes.LOADING_TASK:
            return {
                ...state,
                isLoadingTask: action.payload
            }
        case fromTypes.PLAY_INTERVAL:
            return {
                ...state,
                playInterval: action.payload
            }
        case fromTypes.GET_TASKS:
            return {
                ...state,
                isLoadingTask: false,
                tasks: action.payload.filter(t => (!t.status && !t.inprogress)),
                oldTaskFilter: action.payload.filter(t => (!t.status && !t.inprogress)),
                completeTask: action.payload.filter(t => t.status),
                currentTask: action.payload.filter(t => t.inprogress)[0],
            }
        case fromTypes.ADD_TASK:
            return {
                ...state,
                isLoadingTask: false,
                tasks: [...state.tasks, action.payload],
                editTask: null,
                msg: 'Ok'
            }
        case fromTypes.GET_EDIT_TASK:
            return {
                ...state,
                isLoadingTask: false,
                editTask: null,
                editTask: action.payload,
            }
        case fromTypes.SET_MSG:
            return {
                ...state,
                msg: action.payload
            }
        case fromTypes.FILTER_TASKS_ALL:
            return {
                ...state,
                tasks: [...state.oldTaskFilter]
            }
        case fromTypes.FILTER_TASKS_SHORT:
            return {
                ...state,
                tasks: state.oldTaskFilter.filter(task => task.duration <= 30 )
            }
        case fromTypes.FILTER_TASKS_MEDIUM:
            return {
                ...state,
                tasks: state.oldTaskFilter.filter(task => (task.duration <= 60) && (task.duration >30) )
            }
            case fromTypes.FILTER_TASKS_LARGE:
            return {
                ...state,
                tasks: state.oldTaskFilter.filter(task => (task.duration > 60) )
            }
        default:
            return state;
    }
}