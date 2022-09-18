import axios from "axios"

export const ACTION_TYPES = {
    GET_ALLTODOS_INIT: `GET_ALLTODOS_INIT`,
    GET_ALLTODOS_SUCCESS: `GET_ALLTODOS_SUCCESS`,
    GET_ALLTODOS_ERROR: `GET_ALLTODOS_ERROR`,

    GET_SELECTEDTODO_INIT: `GET_SELECTEDTODO_INIT`,
    GET_SELECTEDTODO_SUCCESS: `GET_SELECTEDTODO_SUCCESS`,
    GET_SELECTEDTODO_ERROR: `GET_SELECTEDTODO_ERROR`,

    REMOVE_SELECTEDTODO: `REMOVE_SELECTEDTODO`,

    ADD_TODO_INIT: `ADD_TODO_INIT`,
    ADD_TODO_SUCCESS: `ADD_TODO_SUCCESS`,
    ADD_TODO_ERROR: `ADD_TODO_ERROR`,

    EDIT_TODO_INIT: `EDIT_TODO_INIT`,
    EDIT_TODO_SUCCESS: `EDIT_TODO_SUCCESS`,
    EDIT_TODO_ERROR: `EDIT_TODO_ERROR`,

    DELETE_TODO_INIT: `DELETE_TODO_INIT`,
    DELETE_TODO_SUCCESS: `DELETE_TODO_SUCCESS`,
    DELETE_TODO_ERROR: `DELETE_TODO_ERROR`,
}

export const GetAllTodos = () => async dispatch => {
    FetchData(dispatch)
}

async function FetchData(dispatch) {
    dispatch({ type: ACTION_TYPES.GET_ALLTODOS_INIT })
    await axios({
        method: `get`,
        url: process.env.REACT_APP_BACKEND_URL,
    })
        .then(response => {
            { dispatch({ type: ACTION_TYPES.GET_ALLTODOS_SUCCESS, payload: response.data }) }
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_ALLTODOS_ERROR, payload: error })
        })
}


export const GetSelectedTodo = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDTODO_INIT })
    await axios({
        method: `get`,
        url: `${process.env.REACT_APP_BACKEND_URL}/${ItemId}`,
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDTODO_SUCCESS, payload: response.data }))
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_SELECTEDTODO_ERROR, payload: error })
        })
};

export const AddTodo = (Item) => dispatch => {
    dispatch({ type: ACTION_TYPES.ADD_TODO_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL,
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.ADD_TODO_SUCCESS })
            FetchData(dispatch)
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.ADD_TODO_ERROR, payload: error })
        })
}

export const UpdateTodo = (Item) => dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_TODO_INIT })
    axios({
        method: `put`,
        url: process.env.REACT_APP_BACKEND_URL + `/${Item.id}`,
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_TODO_SUCCESS })
            FetchData(dispatch)
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_TODO_ERROR, payload: error })
        })
}

export const DeleteTodo = (Item) => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_TODO_INIT })
    axios({
        method: `delete`,
        url: process.env.REACT_APP_BACKEND_URL + `/${Item.id}`,
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_TODO_SUCCESS })
            FetchData(dispatch)
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_TODO_ERROR, payload: error })
        })
}

export const ClearSelectedTodo = () => dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDTODO })
}
