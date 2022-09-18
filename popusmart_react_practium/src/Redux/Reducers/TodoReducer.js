import { ACTION_TYPES } from "../Actions/TodoActions"

const INITIAL_STATE = {
  list: [],
  selected_todo: {
    id: 0,
    content: "",
    isCompleted: false
  },
  errmsg: {},
  isLoading: false,
}

export const TodoReducer = (state = INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case ACTION_TYPES.GET_ALLTODOS_INIT:
      return { ...state, isLoading: true };
    case ACTION_TYPES.GET_ALLTODOS_SUCCESS:
      return { ...state, list: payload, isLoading: false }
    case ACTION_TYPES.GET_ALLTODOS_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDTODO_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.GET_SELECTEDTODO_SUCCESS:
      return { ...state, selected_unit: payload , isLoading: false }
    case ACTION_TYPES.GET_SELECTEDTODO_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.REMOVE_SELECTEDTODO:
      return { ...state, selected_todo: INITIAL_STATE.selected_todo }
    case ACTION_TYPES.EDIT_TODO_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.EDIT_UNIT_SUCCESS:
      return { ...state, isLoading: false }
    case ACTION_TYPES.EDIT_TODO_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.ADD_TODO_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.ADD_TODO_SUCCESS:
      return { ...state, isLoading: false }
    case ACTION_TYPES.ADD_TODO_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.DELETE_TODO_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.DELETE_TODO_SUCCESS:
      return { ...state, isLoading: false, isModalOpen: false }
    case ACTION_TYPES.DELETE_TODO_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    default:
      return state;
  }
}