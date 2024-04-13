const defaultState = {
    todos: []
}

export function todosReducer(state = defaultState, action) {
    if (action.type == 'ADD') {
        let copied = JSON.parse(JSON.stringify(state.todos))
        copied.push(action.payload)
        return {...state, todos: copied}

    } else if (action.type == 'DELETE') {
        let copied = JSON.parse(JSON.stringify(state.todos))
        copied = copied.filter(el => {
            return el.id != action.payload
        })
        return {...state, todos: copied}
    } else if(action.type == 'EDIT') {

    } else {
        return state
    }
}