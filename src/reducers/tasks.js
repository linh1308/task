import * as types from '../constants/ActionType';

let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

let generateID = () => {
    return s4() + s4() + s4() + s4();
}

let findIndex = (tasks, id) => {
    let result = -1;
    tasks.forEach((task, index) => {
        if (task.id === id) {
            result = index;
        }
    });
    return result;
}

let data = JSON.parse(localStorage.getItem('tasks'));
let initialState = data ? data : [];
let myReducer = (state = initialState, action) => {
    let id = '';
    let index = -1;
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            let newTask = {
                id: action.task.id,
                name: action.task.name,
                status: (action.task.status === 'true' || action.task.status === true) ? true : false
            }
            if (!newTask.id) {
                newTask.id = generateID();
                state.push(newTask);
            } else {
                index = findIndex(state, newTask.id);
                state[index] = newTask;
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS:
            id = action.id;
            index = findIndex(state, id);
            state[index] = {
                ...state[index],
                status: !state[index].status
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.DELETE_TASK:
            id = action.id;
            index = findIndex(state, id);
            state.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        default: return state;
    }
}

export default myReducer;