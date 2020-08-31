import * as fromTypes from '../../types';


export default (state, action) => {
    switch (action.type) {
        case fromTypes.LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case fromTypes.SHOW_TOAST:
            return {
                ...state,
                showToast: { ...action.payload }
            }
        case fromTypes.SHOW_TASK_MODAL:
            return {
                ...state,
                showTaskModal: action.payload
            }
        case fromTypes.GET_PROJECTS:
            return {
                ...state,
                projects: [...action.payload]
            }
        case fromTypes.ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload]
            }
            case fromTypes.GET_CURRENT_PROJECT:
            return {
                ...state,
                currentProject: {...action.payload}
            }
        default:
            return state;
    }
}