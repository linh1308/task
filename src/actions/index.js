import * as types from '../constants/ActionType';

export const listAll = () => {
    return {
        type: types.LIST_ALL
    }
}

export const toggleForm = () => {
    return {
        type: types.TOGGLE_FORM
    }
}

export const closeForm = () => {
    return {
        type: types.CLOSE_FORM
    }
}

export const openForm = () => {
    return {
        type: types.OPEN_FORM
    }
}

export const updateStatus = (id) => {
    return {
        type: types.UPDATE_STATUS,
        id: id
    }
}

export const deleteTask = (id) => {
    return {
        type: types.DELETE_TASK,
        id: id
    }
}

export const updateTask = (task) => {
    return {
        type: types.UPDATE_TASK,
        task: task
    }
}

export const saveTask = (task) => {
    return {
        type: types.SAVE_TASK,
        task: task
    }
}

export const filterTask = (filter) => {
    return {
        type: types.FILTER_TABLE,
        filter: filter
    }
}

export const searchTask = (keyword) => {
    return {
        type: types.SEARCH,
        keyword: keyword
    }
}

export const sortTask = (sort) => {
    return {
        type: types.SORT,
        sort: sort
    }
}